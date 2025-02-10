export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PagePropsType = { 
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type ActionResponseType =
    | { success: true }
    | { success: false; message: string };

export interface DialogStateType {
    isOpen: boolean;
    status: "initial" | "loading" | "success" | "failed";
    message: string;
}

export interface MemberProfileType {
    id: string;
    personal: {
        fullName: string;
        dateOfBirth: Date;
        gender: string;
        picture: string;
        fatherName: string;
        motherName: string;
        address: string;
    },
    identification: {
        primaryEmail: string;
        phoneNumber: {
            value: string;
            isVerified: boolean;
        }
        personalIdentificationNo: string;
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
        nbcId: number;
        reason: string;
        permissions: string[];
        interestedIn: string;
        extraCurricularActivities: string;
        position: string[];
        status: "approved" | "pending" | "rejected" | "suspended";
        joinedOn: Date;
        specialNote?: string;
    },
    auth: {
        password: string;
        previousPassword: string;
        lastPasswordChange: Date;
        isTwoStep: boolean;
        twoStepMethods: {
            phones: string[];
            emails: string[];
            authenticator: string;
        },
        backupCodes: string[];
    }
};

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
    position: string[];
    fatherName: string;
    motherName: string;
    instituteAddress: string;
    studentID: string;
    extraCurricularActivities?: string;
    fbProfileLink: string;
}

export type MemberUpdateProfileType = Omit<
    MemberFormType,
    "fullName" | "email" | "phoneNumber" | "agreeRules" | "profilePic" | "position"
>;

export interface MemberPartialProfileType {
    id: string;
    personal: {
        fullName: string;
        picture: string;
    },
    identification: {
        email: string;
    },
    educational: {
        institute: string;
    },
    club: {
        status: "approved" | "pending" | "rejected" | "suspended";
        nbcId: number;
        position: string[];
    }
}

export interface MemberPublicPartialProfileType {
    personal: {
        fullName: string;
        picture: string;
    },
    educational: {
        institute: string;
        presentClass: string;
    },
    club: {
        nbcId: number;
        position: string[];
        interestedIn: string;
    }
}

export interface MemberSearchBarResultType {
    id: string;
    fullName: string;
    nbcId: number;
}

export interface MemberPublicSearchBarResultType {
    fullName: string;
    nbcId: number;
    pageNumber: number;
    position: string[];
}

export interface UserSessionObject {
    id: string;
    nbcId: number;
    fullName: string;
    position: string[];
    permissions: string[];
    picture: string;
    email: string;
    sessionId: string;
}

export interface ServerSessionObject {
    id: string;
    userId: string;
    location: string;
    ipAddress: string;
    device: string;
    timestamp: Date;
    lastActive: Date;
    status: "active" | "expired" | "signedout";
}

export interface LoginFormType {
    nbcId: string;
    password: string;
}

export interface ResetPasswordFormType {
    nbcId: number;
    email: string;
    verificationCode: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface BlogPostType {
    id: string;
    title: string;
    postText: string;
    timestamp: Date;
    thumbnail: string;
    authorId: string;
    authorName: string;
    keywords: string[];
    isModified: boolean;
    isApproved: boolean;
    seenBy: number;
    slug: string;
    excerpt: string;
    modifiedOn: Date;
}

export interface BlogPostFormType {
    title: string;
    postText: string;
    thumbnail: string;
    keywords: string[];
    excerpt: string;
}

export interface DocumentType {
    id: string;
    status: string;
    title: string;
    issuedTo: string;
    issuedBy: string;
    issuedOn: Date;
    validTo: Date;
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

export interface NoticeType {
    id: string;
    title: string;
    description: string;
    attachment: string;
    isImportant: boolean;
    timestamp: Date;
    seenBy: string[];
}

export interface NoticeFormType {
    title: string;
    description: string;
    attachment?: File | string | ArrayBuffer | null;
    isImportant: boolean;
}

export interface HistoryType {
    id: string;
    setBy: string;
    setTo: string;
    message: string;
    timestamp: Date;
}

export interface PaymentType {
    id: string;
    paymentMethod: string;
    paymentFor: string;
    last4digit: string;
    transactionId: string;
    isApproved: string;
}

export interface ClubInfoType {
    name: string;
    localName: string;
    slogan: string;
    address: string;
    contacts: {
        email: string;
        phoneNumber: string;
    }
    establishedOn: Date;
    logo: string;
    social: {
        facebookPage: string;
        facebookGroup: string;
        messengerGroupPublic: string;
    }
}
