"use server";
import { cache } from "react";
import bcrypt from 'bcrypt';
import { signIn } from "@/config/auth.config";
import { db } from "@/config/firebase.config";
import { LoginFormType, MemberProfileType } from "@/types";

const getUserSession = cache(async (docId: string) => {

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
});

const userSignIn = cache(async (credentials: LoginFormType) => {
    const userRef = await db.collection("members").where("club.nbcId", "==", Number(credentials.nbcId)).limit(1).get();

    if (userRef.empty) return {
        nbcId: "NBC ID not exist"
    };

    const userData = userRef.docs[0].data() as MemberProfileType;

    if (userData.club.status !== "approved") return {
        nbcId: "NBC account is disabled by admin"
    };

    const comparePassword = await bcrypt.compare(credentials.password, userData.club.password);

    if (!comparePassword) return {
        password: "Incorrect password"
    };

    await signIn("credentials", { docId: userData.id, redirectTo: "/" });
});

export { getUserSession, userSignIn };