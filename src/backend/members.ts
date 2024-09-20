"use server";
import { db } from "@/config/firebase.config";
import { MemberFormType, MemberProfileType } from "@/types";
import { generateTemporaryId } from "./utils.backend";
import { timestampToDate } from "./utils.backend";
import uploadFileToFirestore from "./uploadFileToFirestore";

interface GetDocumentsOptions {
    query?: string;
    lastDocId?: string;
}

const getMembersProfile = async (options: GetDocumentsOptions = {}): Promise<MemberProfileType[]> => {
    const { query, lastDocId } = options;

    let collectionQuery = db.collection("members").orderBy("club.joinedOn").limit(10);

    if (query) {
        collectionQuery = collectionQuery.where("club.position", "==", query);
    }

    if (lastDocId) {
        const lastDocRef = await db.collection("members").doc(lastDocId).get();
        if (lastDocRef.exists) {
            collectionQuery = collectionQuery.startAfter(lastDocRef);
        }
    }

    const docCollection = await collectionQuery.get();

    return docCollection.docs.map(doc => {
        const memberData = doc.data() as MemberProfileType;
        memberData.club.joinedOn = timestampToDate(memberData.club.joinedOn) as Date;
        memberData.personal.dateOfBirth = timestampToDate(memberData.personal.dateOfBirth) as Date;
        return memberData;
    });
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



export { submitMemberRequest, getMembersProfile };
