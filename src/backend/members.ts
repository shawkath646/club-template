"use server";
import { db } from "@/firebase.config";
import { MemberFormType, MemberProfileType } from "@/types";
import { generateTemporaryId } from "./utils.backend";
import { timestampToDate } from "./utils.backend";
import uploadFileToFirestore from "./uploadFileToFirestore";


// const getAllMembers = async (): Promise<MemberProfileType[]> => {
//     const docCollection = await db.collection("members").get();
//     return docCollection.docs.map(doc => {
//         const memberData = doc.data() as MemberProfileType;
//         memberData.joinedOn = timestampToDate(memberData.joinedOn) as Date;
//         memberData.personal.dateOfBirth = timestampToDate(memberData.personal.dateOfBirth) as Date;

//         return memberData;
//     });
// };

const getPendingMembers = async (): Promise<MemberProfileType[]> => {
    const docCollection = await db.collection("members").where("status", "==", "pending").get();
    return docCollection.docs.map(doc => {
        const memberData = doc.data() as MemberProfileType;
        memberData.joinedOn = timestampToDate(memberData.joinedOn) as Date;
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
        nbcId: "",
        personal: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            picture: await uploadFileToFirestore(formData.profilePic as string, `picture_${docRef.id}`),
            signature: await uploadFileToFirestore(formData.signature as string, `signature_${docRef.id}`),
        },
        address: {
            address1: formData.address1,
            address2: formData.address2 || "",
            city: formData.city,
            state: formData.state,
            country: formData.country,
        },
        identification: {
            identificationDocument: await uploadFileToFirestore(formData.identificationDoc as string, `identification_document_${docRef.id}`),
            identificationNo: formData.identificationNo,
            phoneNumber: formData.phoneNumber,
        },
        educational: {
            institute: formData.institute,
            presentClass: formData.presentClass,
            background: formData.educationalBackground,
            instituteAddress: formData.instituteAddress,
            studentID: formData.studentID
        },
        club: {
            interestedIn: formData.interestedIn,
            reason: formData.joiningReason || "",
            extraCurricularActivities: formData.extraCurricularActivities || "",
            fbProfileLink: formData.fbProfileLink
        },
        email: formData.email,
        password: "",
        status: "pending",
        position: formData.position,
        joinedOn: new Date(),
        nbcID: "",
        tempID: generateTemporaryId(),
    };

    await docRef.set(memberProfile);

    return {
        status: true,
    };
};



export { submitMemberRequest, getPendingMembers };
