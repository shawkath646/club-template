"use server";
import jwt from "jsonwebtoken";
import { ActionResponseType } from "@/types";

const baseAppUrl = "https://cloudburstlab.vercel.app";

const generateAuthorizationToken = () => {
    const secretKey = process.env.APP_SECRET as string;
    return jwt.sign({ appId: process.env.APP_ID }, secretKey, { expiresIn: "1h" });
};

interface AttachmentFileType {
    name: string;
    type: "application/pdf" |
    "application/msword" |
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" |
    "application/vnd.ms-excel" |
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" |
    "application/vnd.ms-powerpoint" |
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" |
    "image/jpeg" |
    "image/png" |
    "image/gif" |
    "image/bmp" |
    "image/svg+xml" |
    "text/plain" |
    "text/html" |
    "text/csv" |
    "application/json" |
    "application/xml" |
    "application/zip" |
    "application/gzip" |
    "application/vnd.rar" |
    "application/x-7z-compressed" |
    "audio/mpeg" |
    "video/mp4" |
    "video/webm" |
    "audio/ogg" |
    "video/ogg" |
    "video/mpeg" |
    "text/markdown" |
    "text/calendar" |
    "application/epub+zip" |
    "font/woff" |
    "font/woff2" |
    "font/ttf" |
    "font/otf";
    base64: string;
};

interface SendMailPropsType {
    recipient: string,
    subject: string;
    body: string;
    type?: "text" | "html";
    cc?: string[];
    bcc?: string[];
    attachments?: AttachmentFileType[];
}

export const sendMail = async (props: SendMailPropsType) => {
    const response = await fetch(`${baseAppUrl}/api/services/send-mail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${generateAuthorizationToken()}`,
        },
        body: JSON.stringify(props),
    });

    return await response.json() as ActionResponseType;
};
