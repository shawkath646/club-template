"use server";
import { firestore } from 'firebase-admin';
import { db } from '@/config/firebase.config';

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

const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
};

const capitalizeWords = (baseWord: string) => (
    baseWord.replace("-", " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
);

export {
    timestampToDate,
    generateRandomId,
    generatePassword,
    generateNbcId,
    capitalizeWords
};
