"use server";
import puppeteer from 'puppeteer';

import profileStatementTemplate from "@/components/templates/profileStatement.template";

const downloadProfileStatement = async (applicationId: string) => {
    const browser = await puppeteer.launch({ headless: true  });
    const defaultPages = await browser.pages();
    let page;
    if (!!defaultPages.length) page = await browser.newPage();
    else page = defaultPages[0];

    const template = await profileStatementTemplate(applicationId);

    await page.setContent(template, { waitUntil: 'networkidle2' });
    //const pdfBuffer = await page.screenshot({ fullPage: true });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
};

export default downloadProfileStatement;
