"use server";
import { cache } from "react";
import bcrypt from 'bcrypt';
import { db, bucket } from "@/config/firebase.config";
import sendMail from "@/config/nodemailer.config";
import { capitalizeWords, generateRandomId, generateNbcId, generatePassword, timestampToDate } from "@/utils/utils.backend";
import { setHistory } from "./history";
import uploadFileToFirestore from "./uploadFileToFirestore";
import approvedEmailTemplate from "@/templates/approvedEmail.template";
import suspensionEmailTemplate from "@/templates/suspensionEmail.template";
import rejectionEmailTemplate from "@/templates/rejectionEmail.template";
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
    memberProfile.personal.dateOfBirth = timestampToDate(memberProfile.personal.dateOfBirth);
    memberProfile.club.joinedOn = timestampToDate(memberProfile.club.joinedOn);
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

const downloadProfilePicture = async (applicationId: string) => {
    const fileRef = bucket.file(`profile_${applicationId}`);
    const [buffer] = await fileRef.download();
    const base64Image = buffer.toString('base64');
    return base64Image;
};

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

    const docId = "MEM" + generateRandomId(4);

    const memberProfile: MemberProfileType = {
        id: docId,
        personal: {
            fullName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            picture: await uploadFileToFirestore(formData.profilePic as string, { fileName: `profile_${docId}`, fileType: "image" }),
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

    await db.collection("members").doc(docId).set(memberProfile);

    return {
        status: true,
        docId
    };
};

const updatePermissions = async (docId: string, permissions: string[]) => {
    const userRef = db.collection("members").doc(docId);
    await userRef.set({ club: { permissions } }, { merge: true });
    await setHistory(docId, `Member permissions updated to ${permissions}`);
};

const updateStatus = async (
    docId: string,
    options: {
        status: MemberProfileType["club"]["status"],
        position: MemberProfileType["club"]["position"],
        specialNote?: string
    }
) => {
    let clubObject;

    const clubInfo = await getClubInfo();
    const userRef = db.collection("members").doc(docId);

    const memberProfile = (await userRef.get()).data() as MemberProfileType;

    try {
        if (options.status === "approved") {
            const nbcId = memberProfile.club.nbcId ?? await generateNbcId();
            const joinedOn = memberProfile.club.nbcId ? memberProfile.club.joinedOn : new Date();

            const password = generatePassword();

            clubObject = {
                nbcId,
                password: await bcrypt.hash(password, 10),
                joinedOn,
                ...options
            };

            await sendMail({
                to: memberProfile.identification.email,
                subject: `${clubInfo.name}: Your Application as ${capitalizeWords(memberProfile.club.position)} Has Been Approved`,
                html: await approvedEmailTemplate({
                    applicantName: memberProfile.personal.fullName,
                    applicantPosition: memberProfile.club.position,
                    applicationId: memberProfile.id,
                    nbcId,
                    password,
                    specialNote: memberProfile.club.specialNote,
                    isNewUser: !!memberProfile.club.nbcId
                })
            });
            await setHistory(docId, `[setBy] approved member [setTo] as ${memberProfile.club.position}`);
        } else if (options.status === "suspended") {
            clubObject = options;

            await sendMail({
                to: memberProfile.identification.email,
                subject: `${clubInfo.name}: Your Membership Has Been Suspended`,
                html: await suspensionEmailTemplate({
                    applicantName: memberProfile.personal.fullName,
                    suspensionReason: memberProfile.club.specialNote || "Not mentioned",
                    applicationId: memberProfile.id,
                    nbcId: memberProfile.club.nbcId,
                    applicantPosition: memberProfile.club.position
                })
            });

            await setHistory(docId, `[setBy] suspended [setTo]'s membership.`);
        } else if (options.status === "rejected") {
            clubObject = options;

            await sendMail({
                to: memberProfile.identification.email,
                subject: `${clubInfo.name}: Your Application as ${capitalizeWords(memberProfile.club.position)} Has Been Declined`,
                html: await rejectionEmailTemplate({
                    applicantName: memberProfile.personal.fullName,
                    applicantPosition: memberProfile.club.position,
                    applicationId: memberProfile.id,
                    rejectionReason: memberProfile.club.specialNote
                })
            });

            await setHistory(docId, `[setBy] rejected [setTo]'s application.`);
        }
    } catch (error) {
        console.error(error);
    }
    await userRef.set({ club: clubObject }, { merge: true });
};

const getAllMembersProfile = cache(async () => {
    const docSnapshot = await db.collection("members").get();

    return docSnapshot.docs.map(doc => {
        const profile = doc.data() as MemberProfileType;
        profile.personal.dateOfBirth = timestampToDate(profile.personal.dateOfBirth);
        profile.club.joinedOn = timestampToDate(profile.club.joinedOn);
        return profile;
    });
});

const getMembersCount = cache(async () => {
    const membersSnapshot = await db.collection("members").get();

    let pendingMembers = 0;
    let approvedMembers = 0;
    let suspendedMembers = 0;
    let rejectedMembers = 0;

    membersSnapshot.forEach(doc => {
        const status = doc.data().club.status;
        if (status === "pending") {
            pendingMembers++;
        } else if (status === "approved") {
            approvedMembers++;
        } else if (status === "suspended") {
            suspendedMembers++;
        } else if (status === "rejected") {
            rejectedMembers++;
        }
    });

    return {
        pendingMembers,
        approvedMembers,
        suspendedMembers,
        rejectedMembers
    };
});


export {
    submitMemberRequest,
    getMembersPartialProfile,
    getMemberProfile,
    updatePermissions,
    updateStatus,
    getAllMembersProfile,
    downloadProfilePicture,
    getMembersCount
};
