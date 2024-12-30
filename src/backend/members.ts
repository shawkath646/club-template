"use server";
import { forbidden, notFound } from "next/navigation";
import { cache } from "react";
import bcrypt from 'bcrypt';
import { db, bucket } from "@/config/firebase.config";
import { getSession } from "./auth";
import sendMail from "@/config/nodemailer.config";
import {
    capitalizeWords,
    generateRandomId,
    generateNbcId,
    generatePassword,
    timestampToDate
} from "@/utils/utils.backend";
import { setHistory } from "./history";
import uploadFileToFirestore from "./uploadFileToFirestore";
import approvedEmailTemplate from "@/templates/approvedEmail.template";
import suspensionEmailTemplate from "@/templates/suspensionEmail.template";
import rejectionEmailTemplate from "@/templates/rejectionEmail.template";
import getClubInfo from "@/constant/getClubInfo";
import joiningFormOptions from "@/constant/joiningFormOptions.json";
import {
    MemberFormType,
    MemberProfileType,
    MemberPartialProfileType,
    MemberSearchBarResultType,
    PartialFields,
    MemberPublicPartialProfileType,
    MemberPublicSearchBarResultType,
    MemberUpdateProfileType
} from "@/types";



interface MembersPartialProfileProps {
    query: "approved" | "pending" | "suspended" | "rejected";
    pageNumber: number;
    filterBy?: string;
}

const getMemberProfile = cache(async (docId: string) => {
    const docRef = await db.collection("members").doc(docId).get();
    if (!docRef.exists) return notFound();
    const userData = docRef.data() as MemberProfileType;
    userData.personal.dateOfBirth = timestampToDate(userData.personal.dateOfBirth);
    userData.club.joinedOn = timestampToDate(userData.club.joinedOn);
    userData.auth.lastPasswordChange = timestampToDate(userData.auth.lastPasswordChange);
    return userData;
});

const getMembersPartialProfile = cache(async (options: MembersPartialProfileProps) => {
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
                email: memberData.identification.primaryEmail
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

const getPublicMembersPartialProfile = cache(async (options: PartialFields<MembersPartialProfileProps, "query">) => {
    const { pageNumber, filterBy } = options;

    const positionHierarchy = ["president", "co-ordinator", "campus-representative", "member"];

    let collectionQuery = db
        .collection("members")
        .where("club.status", "==", "approved");

    if (filterBy && filterBy !== "all") {
        collectionQuery = collectionQuery.where("club.position", "==", filterBy);
    }

    const docCollection = await collectionQuery.get();

    const mapToPartialProfile = (doc: FirebaseFirestore.DocumentSnapshot): MemberPublicPartialProfileType => {
        const memberData = doc.data() as MemberProfileType;

        return {
            club: {
                nbcId: memberData.club.nbcId,
                position: memberData.club.position,
                interestedIn: memberData.club.interestedIn,
            },
            educational: {
                institute: memberData.educational.institute,
                presentClass: memberData.educational.presentClass,
            },
            personal: {
                fullName: memberData.personal.fullName,
                picture: memberData.personal.picture,
            },
        };
    };

    const members = docCollection.docs.map(mapToPartialProfile);

    const sortedMembers = members.sort((a, b) => {
        const positionA = positionHierarchy.indexOf(a.club.position[0]);
        const positionB = positionHierarchy.indexOf(b.club.position[0]);
        return positionA - positionB;
    });

    const pageSize = 12;
    const totalMembers = sortedMembers.length;
    const paginatedMembers = sortedMembers.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    return { members: paginatedMembers, totalMembers };
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
            primaryEmail: formData.email,
            personalIdentificationNo: formData.identificationNo,
            phoneNumber: {
                value: formData.phoneNumber,
                isVerified: false
            },
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
            interestedIn: formData.interestedIn,
            reason: formData.joiningReason || "",
            permissions: [],
            extraCurricularActivities: formData.extraCurricularActivities || "",
            position: formData.position,
            status: "pending",
            joinedOn: new Date(),
        },
        auth: {
            backupCodes: [],
            isTwoStep: false,
            lastPasswordChange: new Date(),
            password: "",
            previousPassword: "",
            twoStepMethods: {
                emails: [formData.email],
                phones: [],
                authenticator: ""
            }
        }
    };

    await db.collection("members").doc(docId).set(memberProfile);

    return {
        status: true,
        docId
    };
};

const updatePermissions = async (docId: string, permissions: string[]) => {
    await db.collection("members").doc(docId).update("club.permissions", permissions);
    await setHistory(docId, `Member permissions updated to ${permissions}`);
};

const updateStatus = async (
    docId: string,
    options: {
        status: MemberProfileType["club"]["status"],
        specialNote: string
    }
) => {

    const clubInfo = await getClubInfo();
    const userData = await getMemberProfile(docId);

    const clubObject: MemberProfileType["club"] = {
        ...userData.club,
        ...options
    };

    if (options.status === "approved") {
        const nbcId = userData.club.nbcId || await generateNbcId();
        const joinedOn = userData.club.nbcId ? userData.club.joinedOn : new Date();

        clubObject.nbcId = nbcId;
        clubObject.joinedOn = joinedOn;

        const password = generatePassword();
        await db.collection("members").doc(docId).update("auth.password", await bcrypt.hash(password, 10));

        await sendMail({
            to: userData.identification.primaryEmail,
            subject: `${clubInfo.name}: Your Application as ${capitalizeWords(userData.club.position[0])} Has Been Approved`,
            html: await approvedEmailTemplate({
                applicantName: userData.personal.fullName,
                applicantPosition: userData.club.position,
                applicationId: userData.id,
                nbcId,
                password,
                specialNote: userData.club.specialNote,
                isNewUser: !userData.club.nbcId
            })
        });
        await setHistory(docId, `[setBy] approved member [setTo] as ${userData.club.position}`);
    } else if (options.status === "suspended") {
        await sendMail({
            to: userData.identification.primaryEmail,
            subject: `${clubInfo.name}: Your Membership Has Been Suspended`,
            html: await suspensionEmailTemplate({
                applicantName: userData.personal.fullName,
                suspensionReason: userData.club.specialNote || "Not mentioned",
                applicationId: userData.id,
                nbcId: userData.club.nbcId,
                applicantPosition: userData.club.position
            })
        });

        await setHistory(docId, `[setBy] suspended [setTo]'s membership.`);
    } else if (options.status === "rejected") {
        await sendMail({
            to: userData.identification.primaryEmail,
            subject: `${clubInfo.name}: Your Application as ${capitalizeWords(userData.club.position[0])} Has Been Declined`,
            html: await rejectionEmailTemplate({
                applicantName: userData.personal.fullName,
                applicantPosition: userData.club.position,
                applicationId: userData.id,
                rejectionReason: userData.club.specialNote
            })
        });

        await setHistory(docId, `[setBy] rejected [setTo]'s application.`);
    }
    await db.collection("members").doc(docId).update("club", clubObject);
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
    const membersCollection = db.collection("members");
    const statuses = ["pending", "approved", "suspended", "rejected"];
    const countPromises = statuses.map(status =>
        membersCollection.where("club.status", "==", status).count().get()
    );
    const counts = await Promise.all(countPromises);
    const [pendingMembers, approvedMembers, suspendedMembers, rejectedMembers] = counts.map(
        count => count.data().count
    );

    return {
        pendingMembers,
        approvedMembers,
        suspendedMembers,
        rejectedMembers,
    };
});

const memberSearchBarResult = cache(async (searchText: string): Promise<MemberSearchBarResultType[]> => {
    const membersCollection = db.collection("members");

    if (searchText.startsWith('MEM') && searchText.length === 13) {
        const memberDoc = await membersCollection.doc(searchText).get();
        if (!memberDoc.exists) return [];

        const memberProfile = memberDoc.data() as MemberProfileType;
        return [{
            id: memberProfile.id,
            fullName: memberProfile.personal.fullName,
            nbcId: memberProfile.club.nbcId
        }];
    }

    if (searchText.length === 6 && !isNaN(Number(searchText))) {
        const nbcIdQuery = await membersCollection
            .where("club.nbcId", "==", parseInt(searchText))
            .limit(1)
            .get();

        if (nbcIdQuery.empty) return [];

        const memberProfile = nbcIdQuery.docs[0].data() as MemberProfileType;
        return [{
            id: memberProfile.id,
            fullName: memberProfile.personal.fullName,
            nbcId: memberProfile.club.nbcId
        }];
    }

    let searchResult: MemberSearchBarResultType[] = [];
    const membersSnapshot = await membersCollection.get();

    membersSnapshot.forEach(doc => {
        const memberProfile = doc.data() as MemberProfileType;

        searchText = searchText.toLowerCase();

        const matchesFullName = memberProfile.personal.fullName.toLowerCase().includes(searchText);
        const matchesInstitute = memberProfile.educational.institute.toLowerCase().includes(searchText);
        const matchesEmail = memberProfile.identification.primaryEmail.toLowerCase().includes(searchText);

        if (matchesFullName || matchesInstitute || matchesEmail) {
            searchResult.push({
                id: memberProfile.id,
                fullName: memberProfile.personal.fullName,
                nbcId: memberProfile.club.nbcId
            });
        }
    });

    return searchResult;
});

const memberPublicSearchBarResult = cache(async (searchText: string): Promise<MemberPublicSearchBarResultType[]> => {
    const membersSnapshot = await db.collection("members").where("club.status", "==", "approved").get();

    const membersData = membersSnapshot.docs.map(doc => doc.data() as MemberProfileType);

    const sortedMembers = membersData.sort((a, b) => {
        const positionA = joiningFormOptions.positions.indexOf(a.club.position[0]);
        const positionB = joiningFormOptions.positions.indexOf(b.club.position[0]);
        return positionA - positionB;
    });

    const membersWithIndex = sortedMembers.map((member, index) => {
        return { ...member, originalIndex: index };
    });

    const filteredMembers = membersWithIndex.filter(member =>
        member.club.nbcId.toString() === searchText ||
        member.personal.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        member.educational.institute.toLowerCase().includes(searchText.toLowerCase())
    );

    const membersPerPage = 12;
    const resultsWithPageInfo = filteredMembers.map((member) => {
        const pageNumber = Math.floor(member.originalIndex / membersPerPage) + 1;

        return {
            nbcId: member.club.nbcId,
            fullName: member.personal.fullName,
            position: member.club.position,
            pageNumber,
        } as MemberPublicSearchBarResultType;
    });

    return resultsWithPageInfo;
});

const updatePosition = async (docId: string, position: string[]) => {
    await db.collection("members").doc(docId).update("club.position", position);
    return true;
};

const changeProfilePicture = async (base64Image: string) => {
    const session = await getSession();
    if (!session) forbidden();
    const downloadUrl = await uploadFileToFirestore(base64Image, { fileName: `profile_${session.id}`, fileType: "image" });
    await db.collection("members").doc(session.id).update("personal.picture", downloadUrl);
    return true;
};

const updateProfile = async (updatedData: MemberUpdateProfileType) => {
    const session = await getSession();
    if (!session) forbidden();

    const updatedUserObject = {
        club: {
            extraCurricularActivities: updatedData.extraCurricularActivities,
            reason: updatedData.joiningReason,
            interestedIn: updatedData.interestedIn,
        },
        personal: {
            address: updatedData.address,
            dateOfBirth: updatedData.dateOfBirth,
            gender: updatedData.gender,
            fatherName: updatedData.fatherName,
            motherName: updatedData.motherName,
        },
        educational: {
            institute: updatedData.institute,
            instituteAddress: updatedData.instituteAddress,
            studentID: updatedData.studentID,
            background: updatedData.educationalBackground,
            presentClass: updatedData.presentClass,
        },
    };

    await db.collection("members").doc(session.id).set(updatedUserObject, { merge: true });
    return true;
};


export {
    submitMemberRequest,
    getMembersPartialProfile,
    getMemberProfile,
    updatePermissions,
    updateStatus,
    getAllMembersProfile,
    downloadProfilePicture,
    getMembersCount,
    memberSearchBarResult,
    getPublicMembersPartialProfile,
    memberPublicSearchBarResult,
    updatePosition,
    changeProfilePicture,
    updateProfile
};
