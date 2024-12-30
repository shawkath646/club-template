"use server";
import { bucket } from '@/config/firebase.config';
import { generateRandomId } from '@/utils/utils.backend';

const uploadFileToFirestore = async (
    data: string,
    options?: {
        fileName?: string,
        fileType?: 'image' | 'video' | 'document'
    }
): Promise<string> => {
    let base64Data: string;
    let format: string;

    const matches = data.match(/^data:(.+?);base64,(.*)$/);
    if (matches) {
        format = matches[1];
        base64Data = matches[2];

        let imageBuffer = Buffer.from(base64Data, 'base64');

        const fileName = options?.fileName ?? `file_${generateRandomId(8)}`;
        const fileRef = bucket.file(fileName);

        const fileExists = await fileRef.exists();
        if (fileExists[0]) await fileRef.delete();

        await fileRef.save(imageBuffer, {
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
    } else {
        throw new Error('Invalid base64 format');
    }
};

export default uploadFileToFirestore;
