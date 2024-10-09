"use server";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { bucket } from '@/config/firebase.config';
import profilePDFTemplate from "@/templates/profilePDF.template";


const downloadProfilePDF = async (applicationId: string) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const executablePath = isDevelopment
        ? process.env.CHROME_EXECUTABLE_PATH
        : await chromium.executablePath();

    const browser = await puppeteer.launch({
        args: isDevelopment ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    const template = await profilePDFTemplate(applicationId);

    await page.setContent(template);

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await browser.close();

    return pdfBuffer;
};

const downloadProfilePicture = async (applicationId: string) => {
    const fileRef = bucket.file(`profile_${applicationId}`);
    const [buffer] = await fileRef.download();
    const base64Image = buffer.toString('base64');
    return base64Image;
};

export { downloadProfilePDF, downloadProfilePicture };
