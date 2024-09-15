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
    firstName: string;
    lastName: string;
    institute: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    identificationNo: string;
    gender: "male" | "female" | "other";
    educationalBackground: "science" | "business studies" | "humanities" | "vocational";
    presentClass: string;
    joiningReason?: string;
    interestedIn: "articles" | "olympiads" | "magazine" | "volunteering";
    agreeRules: boolean;
    profilePic: File | string | ArrayBuffer;
    identificationDoc: File | string | ArrayBuffer;
    signature: File | string | ArrayBuffer;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    position: string;
}

export interface MemberProfileType {
    id: string;
    personal: {
        firstName: string;
        lastName: string;
        dateOfBirth: Date | Timestamp;
        gender: "male" | "female" | "other";
        picture: string;
        signature: string;
    },
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
    },
    identification: {
        phoneNumber: string;
        identificationNo: string;
        identificationDocument: string;
    }
    educational: {
        institute: string;
        background: "science" | "business studies" | "humanities" | "vocational";
        presentClass: string;
    },
    club: {
        reason: string;
        interestedIn: "articles" | "olympiads" | "magazine" | "volunteering";
    },
    email: string;
    password: string;
    status: "approved" | "pending" | "rejected" | "cancelled" | "expired";
    joinedOn: Date | Timestamp;
    position: string;
}

export interface NoticeFormType {
    title: string;
    description: string;
    attachment: File | string | ArrayBuffer | null;
    isImportant: boolean;
}
