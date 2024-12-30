"use server";
import { cookies, headers } from 'next/headers';
import { forbidden, notFound, redirect } from 'next/navigation';
import { cache } from 'react';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { getMemberProfile } from './members';
import { generateRandomId, timestampToDate } from '@/utils/utils.backend';
import { db } from '@/config/firebase.config';
import { MemberProfileType, UserSessionObject, SessionObject } from '@/types';
import getClubInfo from '@/constant/getClubInfo';


interface CookieObject extends JwtPayload {
  id: string;
  userId: string;
}

interface SignInOptions {
  twoStepCode?: number;
  redirectTo?: string;
}

interface SignOutOptions {
  sessionId?: string;
  redirectTo?: string;
}

interface AuthenticatorSecretKeyTempSessionType {
  secretKey: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
}

const SECRET_KEY = process.env.AUTH_SECRET;
if (!SECRET_KEY) throw new Error("Error: [Auth] No secret key found!");

const getSession = cache(async (): Promise<UserSessionObject | null> => {

  const cookiesList = await cookies();
  const sessionCookie = cookiesList.get('auth_session')?.value;
  if (!sessionCookie) return null;

  const payload = jwt.verify(sessionCookie, SECRET_KEY) as CookieObject;

  const sessionDoc = await db.collection("members").doc(payload.userId).collection("sessions").doc(payload.id).get();
  const sessionData = sessionDoc.data() as SessionObject | undefined;

  if (!sessionData || sessionData.status !== "active") {
    // cookiesList.delete('auth_session');
    return null;
  };

  const userObjectDoc = await db.collection("members").doc(payload.userId).get();
  const userObject = userObjectDoc.data() as MemberProfileType | undefined;

  if (!userObject) return null;
  await db.collection("members").doc(payload.userId).collection("sessions").doc(payload.id).update("lastActive", new Date());

  return {
    email: userObject.identification.primaryEmail,
    id: userObject.id,
    picture: userObject.personal.picture,
    fullName: userObject.personal.fullName,
    nbcId: userObject.club.nbcId,
    permissions: userObject.club.permissions,
    position: userObject.club.position,
    sessionId: sessionData.id
  };
});

const signIn = async (
  nbcId: number,
  password: string,
  { twoStepCode, redirectTo }: SignInOptions = {}
) => {
  const userRef = await db.collection("members").where("club.nbcId", "==", nbcId).limit(1).get();
  if (userRef.empty) return;

  const userData = userRef.docs[0].data() as MemberProfileType;

  if (userData.club.status !== "approved") return { nbcId: "NBC account is disabled by admin" };

  const isPasswordCorrect = await bcrypt.compare(password, userData.auth.password);
  if (!isPasswordCorrect) return { password: "Incorrect password" };

  const headersList = await headers();
  const deviceIP = headersList.get("x-forwarded-for") || "Unknown IP address";

  let deviceLocation = "Unknown location";
  try {
    const locationResponse = await fetch(`http://ip-api.com/json/${deviceIP}`);
    const locationData = await locationResponse.json();
    if (locationData.status === "success") {
      deviceLocation = `${locationData.isp} - ${locationData.city}, ${locationData.country}`;
    }
  } catch (locationError) {
    console.error("Failed to fetch location:", locationError);
  }

  const sessionObject: SessionObject = {
    id: "SESSION" + generateRandomId(10),
    userId: userData.id,
    ipAddress: deviceIP,
    device: headersList.get("user-agent") || "Unknown device",
    location: deviceLocation,
    timestamp: new Date(),
    lastActive: new Date(),
    status: "active"
  };

  await db.collection("members").doc(userData.id).collection("sessions").doc(sessionObject.id).set(sessionObject);

  const cookieObject: CookieObject = {
    id: sessionObject.id,
    userId: sessionObject.userId
  };
  const token = jwt.sign(cookieObject, SECRET_KEY, { expiresIn: "30d" });

  const cookieList = await cookies();
  cookieList.set({ name: "auth_session", value: token, httpOnly: true, secure: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

  return redirect(redirectTo ?? (userData.club.permissions.length ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools` : process.env.NEXT_PUBLIC_APP_BASE_URL as string));
};

const signOut = async ({ sessionId, redirectTo }: SignOutOptions = {}) => {
  const session = await getSession();
  if (!session) forbidden();

  const targetSessionId = sessionId ?? session.sessionId;

  await db.collection("members")
    .doc(session.id)
    .collection("sessions")
    .doc(targetSessionId)
    .set({ status: "signedout" }, { merge: true });

  if (!sessionId) {
    const cookiesList = await cookies();
    cookiesList.delete('auth_session');

    return redirect(redirectTo ?? "/");
  };

  return true;
};


const getAllSessions = cache(async () => {
  const session = await getSession();
  if (!session) forbidden();
  const sessionSnapshot = await db.collection("members")
    .doc(session.id)
    .collection("sessions")
    .orderBy("timestamp", "desc")
    .get();
  return sessionSnapshot.docs.map(doc => {
    const data = doc.data() as SessionObject;
    data.lastActive = timestampToDate(data.lastActive);
    data.timestamp = timestampToDate(data.timestamp);
    return data;
  });
});

const changePassword = async (oldPassword: string, newPassword: string, logoutAllDevice: boolean) => {
  const session = await getSession();
  if (!session) forbidden();

  const userData = await getMemberProfile(session.id);

  const isMatchOldPassword = await bcrypt.compare(newPassword, userData.auth.previousPassword);
  if (newPassword === oldPassword || isMatchOldPassword) return { newPassword: "New password can't be old password" };

  const isPasswordCorrect = await bcrypt.compare(oldPassword, userData.auth.password);
  if (!isPasswordCorrect) return { oldPassword: "Incorrect password" };

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await db.collection("members").doc(session.id).set(
    {
      auth: {
        ...userData.auth,
        previousPassword: userData.auth.password,
        password: hashedNewPassword,
        lastPasswordChange: new Date(),
      },
    },
    { merge: true }
  );

  if (logoutAllDevice) {
    const sessionsRef = db.collection("members").doc(session.id).collection("sessions");
    const sessionsSnapshot = await sessionsRef.get();

    const deletePromises = sessionsSnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    const cookiesList = await cookies();
    cookiesList.delete('auth_session');

    return redirect("/");
  };

  return true;
};

const changeTwoStepStatus = async (value: boolean) => {
  const session = await getSession();
  if (!session) forbidden();

  await db
    .collection("members")
    .doc(session.id)
    .update({
      "auth.isTwoStep": value,
    });

  return true;
};

const getAuthenticatorSecretKey = async () => {
  const session = await getSession();
  if (!session) forbidden();

  const secretKey = authenticator.generateSecret();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const tempSessionData: AuthenticatorSecretKeyTempSessionType = {
    secretKey,
    createdAt: new Date(),
    expiresAt,
    userId: session.id,
  };

  const clubInfo = await getClubInfo();

  const tempSessionDoc = await db.collection("tempSession").add(tempSessionData);
  const authQRURL = `otpauth://totp/${session.email}?secret=${secretKey}&issuer=${clubInfo.name}`;

  return {
    tempSessionId: tempSessionDoc.id,
    authQRURL,
    secretKey
  };
};

const addAuthenticatorSecretKey = async (tempSessionId: string, token: string) => {
  const session = await getSession();
  if (!session) forbidden();

  const tempSessionDoc = await db.collection("tempSession").doc(tempSessionId).get();
  if (!tempSessionDoc.exists) return { error: "Temporary session not found" };

  const tempSession = tempSessionDoc.data() as AuthenticatorSecretKeyTempSessionType;

  if (new Date() > timestampToDate(tempSession.expiresAt)) {
    await tempSessionDoc.ref.delete();
    return { error: "Temporary session expired" };
  }

  const isValidToken = authenticator.check(token, tempSession.secretKey);
  if (!isValidToken) return { error: "Invalid token" };

  await db.collection("members").doc(session.id).update({
    "auth.twoStepMethods.authenticator": tempSession.secretKey,
  });

  await tempSessionDoc.ref.delete();
  return true;
};

const removeAuthenticator = async () => {
  const session = await getSession();
  if (!session) forbidden();

  await db.collection("members").doc(session.id).update("auth.twoStepMethods.authenticator", "");
  return true;
};

const getBackupCodes = cache(async () => {
  const session = await getSession();
  if (!session) forbidden();

  const userData = await getMemberProfile(session.id);
  let backupCodes = userData.auth.backupCodes;

  if (!backupCodes.length) {
    backupCodes = await resetBackupCodes();
  };

  return backupCodes;
});

const resetBackupCodes = async () => {
  const session = await getSession();
  if (!session) forbidden();

  const newBackupCodes = [];
  for (let i = 0; i < 10; i++) {
    newBackupCodes.push(Math.floor(10000000 + Math.random() * 90000000).toString());
  }

  await db.collection("members").doc(session.id).update({ "auth.backupCodes": newBackupCodes });
  return newBackupCodes;
};


export {
  signIn,
  signOut,
  getSession,
  getAllSessions,
  changePassword,
  changeTwoStepStatus,
  getAuthenticatorSecretKey,
  addAuthenticatorSecretKey,
  removeAuthenticator,
  getBackupCodes,
  resetBackupCodes
};
