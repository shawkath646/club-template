"use server";
import { firestore } from 'firebase-admin';
import { db } from '@/config/firebase.config';

function timestampToDate(input: firestore.Timestamp | Date): Date | null {
    if (input instanceof Date) {
        return input;
    } else if (input instanceof firestore.Timestamp) {
        const milliseconds = input.seconds * 1000 + input.nanoseconds / 1000000;
        return new Date(milliseconds);
    } else {
        return null;
    }
};

function generateTemporaryId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${datePart}${randomPart}`;
};

async function generateNbcId(): Promise<string> {
    const membersRef = db.collection('members');

    const lastMemberSnapshot = await membersRef
        .orderBy('club.nbcId', 'desc')
        .limit(1)
        .get();

    if (lastMemberSnapshot.empty) {
        return 'NBC1000';
    }

    const lastNbcId = lastMemberSnapshot.docs[0].get('club.nbcId') as string;
    const numericPart = parseInt(lastNbcId.replace('NBC', ''), 10);

    return `NBC${numericPart + 1}`;
};

const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

export { timestampToDate, generateTemporaryId, generateNbcId, generatePassword };