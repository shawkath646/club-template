"use server";
import { cache } from "react";
import bcrypt from 'bcrypt';
import { db } from "@/config/firebase.config";
import sendMail from "@/config/nodemailer.config";
import { generateNbcId, generatePassword, generateMemberId, timestampToDate } from "./utils.backend";
import uploadFileToFirestore from "./uploadFileToFirestore";
import approvedEmailTemplate from "@/templates/approvedEmail.template";
import getClubInfo from "@/constant/getClubInfo";
import { MemberFormType, MemberProfileType, MemberPartialProfileType } from "@/types";

interface GetDocumentsOptions {
    query: "approved" | "pending" | "suspended" | "rejected";
    pageNumber: number;
    filterBy?: string;
}

const getMemberProfile = cache(async (docId: string) => {
    const docRef = await db.collection("members").doc(docId).get();
    if (!docRef.exists) return null;
    const memberProfile = docRef.data() as MemberProfileType;
    memberProfile.personal.dateOfBirth = timestampToDate(memberProfile.personal.dateOfBirth) as Date;
    memberProfile.club.joinedOn = timestampToDate(memberProfile.club.joinedOn) as Date;
    return memberProfile;
});

const getMembersPartialProfile = cache(async (options: GetDocumentsOptions) => {
    const { query, pageNumber, filterBy } = options;

    let collectionQuery = db.collection("members")
        .orderBy("club.joinedOn", "desc")
        .where("club.status", "==", query);

    if (filterBy && filterBy !== "all") {
        collectionQuery = collectionQuery.where("club.position", "==", filterBy);
    }

    const [docCollection, totalCountSnapshot] = await Promise.all([
        collectionQuery.limit(12).offset((pageNumber - 1) * 12).get(),
        collectionQuery.get()
    ]);

    const totalMembers = totalCountSnapshot.docs.length;

    const mapToPartialProfile = (doc: FirebaseFirestore.DocumentSnapshot): MemberPartialProfileType => {
        const memberData = doc.data() as MemberProfileType;

        return {
            club: {
                status: memberData.club.status,
                nbcId: memberData.club.nbcId,
                position: memberData.club.position
            },
            educational: {
                institute: memberData.educational.institute
            },
            id: doc.id,
            identification: {
                email: memberData.identification.email
            },
            personal: {
                fullName: memberData.personal.fullName,
                picture: memberData.personal.picture
            }
        };
    };

    const members = docCollection.docs.map(mapToPartialProfile);

    return { members, totalMembers };
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

    const applicationId = generateMemberId()

    const memberProfile: MemberProfileType = {
        id: applicationId,
        personal: {
            fullName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            picture: await uploadFileToFirestore(formData.profilePic as string, { fileName: `profile_${applicationId}`, fileType: "image" }),
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
            nbcId: 0,
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

    await db.collection("members").doc(applicationId).set(memberProfile);

    return {
        status: true,
    };
};

const updatePermissions = async (docId: string, permissions: string[]) => {
    const userRef = db.collection("members").doc(docId);
    await userRef.set({ club: { permissions } }, { merge: true });
};

const updateStatus = async (docId: string, status: string) => {
    let clubObject;

    const clubInfo = await getClubInfo();
    const userRef = db.collection("members").doc(docId);

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

        try {
            await sendMail({
                from: process.env.NODE_MAILER_ID,
                to: memberProfile.identification.email,
                subject: `🎉 Congratulations! Your Application to ${clubInfo.name} Has Been Approved`,
                html: await approvedEmailTemplate({
                    applicantName: memberProfile.personal.fullName,
                    applicantPosition: memberProfile.club.position,
                    applicationId: memberProfile.id,
                    nbcId,
                    password
                })
            });
        } catch (error) {
            console.error(error)
        }
    } else clubObject = { status };

    await userRef.set({ club: clubObject }, { merge: true });
};

const getAllMembersProfile = cache(async () => {
    const docSnapshot = await db.collection("members").get();

    return docSnapshot.docs.map(doc => {
        const profile = doc.data() as MemberProfileType;
        profile.personal.dateOfBirth = timestampToDate(profile.personal.dateOfBirth) as Date;
        profile.club.joinedOn = timestampToDate(profile.club.joinedOn) as Date;
        return profile;
    });
});

export { submitMemberRequest, getMembersPartialProfile, getMemberProfile, updatePermissions, updateStatus, getAllMembersProfile };
