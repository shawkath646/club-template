"use server";
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';
import profileStatementTemplate from "@/components/templates/profileStatement.template";

const downloadProfileStatement = async (applicationId: string) => {
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    const browser = await puppeteer.launch({
        args: isLocal ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH,
        headless: chromium.headless,
    });
    const page = await browser.newPage();

    const template = await profileStatementTemplate(applicationId);

    await page.setContent(template);

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
};

export default downloadProfileStatement;
