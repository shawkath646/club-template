"use server";
import { storage } from '@/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const uploadFileToFirestore = async (
    data: string,
    fileName?: string
): Promise<string> => {
    try {
        let base64Data: string;
        let format: string;

        const matches = data.match(/^data:(.+?);base64,(.*)$/);
        if (matches) {
            format = matches[1];
            base64Data = matches[2];
        } else {
            throw new Error('Invalid base64 format');
        }
        
        if (!fileName) fileName = `file_${uuidv4()}`;

        const buffer = Buffer.from(base64Data, 'base64');
        const fileRef = storage.bucket().file(fileName);

        const fileExists = await fileRef.exists();
        if (fileExists[0]) await fileRef.delete();

        await fileRef.save(buffer, {
            metadata: {
                contentType: format,
                cacheControl: 'public,max-age=31536000',
            },
        });

        const downloadLink = await fileRef.getSignedUrl({
            action: 'read',
            expires: '01-01-2074',
        });

        return downloadLink[0];
    } catch (error: any) {
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};

export default uploadFileToFirestore;
