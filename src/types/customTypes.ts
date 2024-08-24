export interface PagePropsType {
    params: {
        slug: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}


export interface DocumentVerifyClientType {
    status?: boolean;
    statusText?: string;
    docInfo?: {
        id: string;
        status: string;
        title: string;
        issuedTo: string;
        issuedBy: string;
        issuedOn: Date;
        validTo: Date;
    }
}