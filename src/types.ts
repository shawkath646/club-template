import { Timestamp } from 'firebase-admin/firestore';

export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface PagePropsType {
    params: {
        slug: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}


export interface DialogStateType {
    isOpen: boolean;
    status: "initial" | "loading" | "success" | "failed";
    message: string
}

export interface DocumentType {
    id: string;
    status: string;
    title: string;
    issuedTo: string;
    issuedBy: string;
    issuedOn: Date | Timestamp;
    validTo: Date | Timestamp;
    format: string;
    fileName: string;
    downloadLink: string;
    scope: string;
    verifiable: boolean;
}

export interface DocumentVerificationType {
    status?: boolean;
    statusText?: string;
    docInfo?: PartialFields<DocumentType, "downloadLink" | "fileName" | "scope" | "format" | "verifiable">;
}

export interface MemberFormType {
    fullName: string;
    institute: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    identificationNo: string;
    gender: string;
    educationalBackground: string;
    presentClass: string;
    joiningReason?: string;
    interestedIn: string;
    agreeRules: boolean;
    profilePic: File | string | ArrayBuffer;
    address: string;
    position: string;
    fatherName: string;
    motherName: string;
    instituteAddress: string;
    studentID: string;
    extraCurricularActivities?: string;
    fbProfileLink: string
}

export interface MemberProfileType {
    id: string;

    personal: {
        fullName: string;
        dateOfBirth: Date | Timestamp;
        gender: string;
        picture: string;
        fatherName: string;
        motherName: string;
        address: string;
    },
    identification: {
        email: string;
        phoneNumber: string;
        identificationNo: string;
        fbProfileLink: string;
    }
    educational: {
        institute: string;
        instituteAddress: string;
        studentID: string;
        background: string;
        presentClass: string;
    },
    club: {
        nbcId: string;
        password: string;
        tempID: string;
        reason: string;
        permissions: string[];
        interestedIn: string;
        extraCurricularActivities: string;
        position: string;
        status: "approved" | "pending" | "rejected" | "cancelled" | "expired";
        joinedOn: Date | Timestamp;
    },
}

export interface NoticeFormType {
    title: string;
    description: string;
    attachment: File | string | ArrayBuffer | null;
    isImportant: boolean;
}

export interface LoginFormType {
    nbcId: string;
    password: string;
}
