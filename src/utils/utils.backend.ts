"use server";
import { remark } from "remark";
import strip from "strip-markdown";
import { firestore } from 'firebase-admin';
import { db } from '@/config/firebase.config';
import keywordStopWords from "@/constant/keywordStopWords.json";

const timestampToDate = (input: firestore.Timestamp | Date): Date => {
    if (input instanceof Date) return input;
    const { seconds, nanoseconds } = input as firestore.Timestamp;
    return new Date(seconds * 1000 + nanoseconds / 1_000_000);
};

function generateRandomId(length: number): string {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < length; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${datePart}${randomPart}`;
};

const generateNbcId = async (): Promise<number> => {
    const membersRef = db.collection('members');
    const lastMemberSnapshot = await membersRef
        .orderBy('club.nbcId', 'desc')
        .limit(1)
        .get();

    if (lastMemberSnapshot.empty) return 100000;
    const lastNbcId = lastMemberSnapshot.docs[0].get('club.nbcId') as number;
    return lastNbcId + 1;
};

const generatePassword = (options = { numberOnly: false, length: 8 }) => {
    const numbers = `0123456789`;
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    const charSet = options.numberOnly ? numbers : characters;
    const passwordLength = options.length || 8;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    return password;
};

const capitalizeWords = (baseWord: string) => (
    baseWord
        .replace(/-/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
);

const formatDate = (input: Date, { locale = 'en-US', isTime = false } = {}) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...(isTime && { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    };

    return input.toLocaleDateString(locale, dateOptions);
};

export const stripMarkdown = async (markdownText: string): Promise<string> => {
    const result = await remark().use(strip).process(markdownText);
    return result.toString();
};

export const extractKeywords = async (title: string): Promise<string[]> => {
    const words = title.toLowerCase().replace(/[^\p{L}\s]/gu, "").split(/\s+/);
    const stopwords = new Set(keywordStopWords);
    return [...new Set(words.filter(word => word.length > 2 && !stopwords.has(word)))].slice(0, 5);
};


export {
    timestampToDate,
    generateRandomId,
    generatePassword,
    generateNbcId,
    capitalizeWords,
    formatDate
};
