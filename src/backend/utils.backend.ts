"use server";
import { firestore } from 'firebase-admin';

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

export { timestampToDate };