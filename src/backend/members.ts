"use server";
import { cache } from "react";
import bcrypt from 'bcrypt';
import { db } from "@/config/firebase.config";
import { generateNbcId, generatePassword, generateTemporaryId, timestampToDate } from "./utils.backend";
import uploadFileToFirestore from "./uploadFileToFirestore";
import sendMail from "@/config/nodemailer.config";
import approvedEmailTemplate from "@/constant/approvedEmail.template";
import { MemberFormType, MemberProfileType } from "@/types";
import applicaionInfo from "@/constant/applicaiton-info.json";


interface GetDocumentsOptions {
    query?: string;
    lastDocId?: string;
}

const getMemberProfile = cache(async (docId: string): Promise<MemberProfileType> => {
    const docRef = await db.collection("members").doc(docId).get();
    const memberProfile = docRef.data() as MemberProfileType;
    memberProfile.personal.dateOfBirth = timestampToDate(memberProfile.personal.dateOfBirth) as Date;
    memberProfile.club.joinedOn = timestampToDate(memberProfile.club.joinedOn) as Date;
    return memberProfile;
});

const getMembersProfile = cache(async (options: GetDocumentsOptions = {}): Promise<MemberProfileType[]> => {
    const { query, lastDocId } = options;

    let collectionQuery = db.collection("members").orderBy("club.joinedOn");

    if (query) {
        collectionQuery = collectionQuery.where("club.status", "==", query);
    }

    if (lastDocId) {
        const lastDocRef = await db.collection("members").doc(lastDocId).get();
        if (lastDocRef.exists) {
            collectionQuery = collectionQuery.startAfter(lastDocRef);
        }
    }

    const docCollection = await collectionQuery.limit(10).get();

    return docCollection.docs.map(doc => {
        const memberData = doc.data() as MemberProfileType;
        memberData.club.joinedOn = timestampToDate(memberData.club.joinedOn) as Date;
        memberData.personal.dateOfBirth = timestampToDate(memberData.personal.dateOfBirth) as Date;
        return memberData;
    });
});

const submitMemberRequest = async (formData: MemberFormType) => {
    const errors: Array<{ field: keyof MemberFormType; message: string }> = [];

    const [existingUserEmail, existingUserIdentification] = await Promise.all([
        db.collection("members").where("email", "==", formData.email).get(),
        db.collection("members").where("identification.identificationNo", "==", formData.identificationNo).get()
    ]);

    if (existingUserEmail.docs.length > 0) {
        errors.push({ field: "email", message: "Email already used by another member" });
    }

    if (existingUserIdentification.docs.length > 0) {
        errors.push({ field: "identificationNo", message: "Identification number already used by another member" });
    }

    if (errors.length > 0) {
        return {
            status: false,
            errors,
        };
    };

    const docRef = db.collection("members").doc();

    const memberProfile: MemberProfileType = {
        id: docRef.id,
        personal: {
            fullName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            picture: await uploadFileToFirestore(formData.profilePic as string, `picture_${docRef.id}`),
            address: formData.address
        },
        identification: {
            email: formData.email,
            identificationNo: formData.identificationNo,
            phoneNumber: formData.phoneNumber,
            fbProfileLink: formData.fbProfileLink
        },
        educational: {
            institute: formData.institute,
            presentClass: formData.presentClass,
            background: formData.educationalBackground,
            instituteAddress: formData.instituteAddress,
            studentID: formData.studentID
        },
        club: {
            tempID: generateTemporaryId(),
            nbcId: "",
            password: "",
            interestedIn: formData.interestedIn,
            reason: formData.joiningReason || "",
            permissions: [],
            extraCurricularActivities: formData.extraCurricularActivities || "",
            position: formData.position,
            status: "pending",
            joinedOn: new Date(),
        },
    };

    await docRef.set(memberProfile);

    return {
        status: true,
    };
};

const updatePermissions = async (docId: string, permissions: string[]) => {
    const userRef = db.collection("members").doc(docId);
    await userRef.set({ club: { permissions } }, { merge: true });
};

const updateStatus = async (docId: string, status: string) => {
    const userRef = db.collection("members").doc(docId);

    let clubObject;

    if (status === "approved") {

        const memberProfile = (await userRef.get()).data() as MemberProfileType;

        const nbcId = memberProfile.club.nbcId || await generateNbcId();
        const joinedOn = memberProfile.club.nbcId ? memberProfile.club.joinedOn : new Date();

        const password = generatePassword();

        clubObject = {
            status,
            nbcId,
            password: await bcrypt.hash(password, 10),
            joinedOn
        };

        await sendMail({
            from: process.env.NODE_MAILER_ID,
            to: memberProfile.identification.email,
            subject: `🎉 Congratulations! Your Application to ${applicaionInfo.name} Has Been Approved`,
            html: approvedEmailTemplate({
                applicantName: memberProfile.personal.fullName,
                applicantPosition: memberProfile.club.position,
                applicationId: memberProfile.club.tempID,
                nbcId,
                password
            })
        });
    } else clubObject = { status };

    await userRef.set({ club: clubObject }, { merge: true });
};



export { submitMemberRequest, getMembersProfile, getMemberProfile, updatePermissions, updateStatus };
