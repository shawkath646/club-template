"use server";
import { signIn } from "@/config/auth.config";
import { db } from "@/config/firebase.config";
import { LoginFormType, MemberProfileType } from "@/types";

async function getUserSession(docId: string) {

    const userRef = await db.collection("members").doc(docId).get();
    const userData = userRef.data() as MemberProfileType;

    return {
        id: userData.id,
        nbcId: userData.club.nbcId,
        name: userData.personal.fullName,
        position: userData.club.position,
        image: userData.personal.picture,
        email: userData.identification.email,
        permissions: userData.club.permissions
    };
};

async function userSignIn(credentials: LoginFormType) {
    const userRef = await db.collection("members").where("club.nbcId", "==", credentials.nbcId).limit(1).get();

    if (userRef.empty) return {
        nbcId: "NBC ID not exist"
    };

    const userData = userRef.docs[0].data() as MemberProfileType;

    if (userData.club.status !== "approved") return {
        nbcId: "NBC account is disabled by admin"
    };

    if (userData.club.password !== credentials.password) return {
        password: "Incorrect password"
    };

    await signIn("credentials", { docId: userData.id, redirectTo: "/" });
}

export { getUserSession, userSignIn };