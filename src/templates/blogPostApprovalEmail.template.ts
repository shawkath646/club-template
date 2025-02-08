"use server";

import getClubInfo from "@/constant/getClubInfo";

const blogPostApprovalEmailTemplate = async ({
    memberName,
    postTitle,
    slug
}: {
    memberName: string;
    postTitle: string;
    slug: string;
}) => {

    const clubInfo = await getClubInfo();
    const today = new Date();

    return (`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.6;">
            <main style="max-width: 650px; margin: 0 auto; padding: 20px;">
            <header style="background: linear-gradient(135deg, #00b4d8, #0077b6); padding: 25px; border-radius: 12px 12px 0 0; color: #ffffff; text-align: center; display: flex; align-items: center; justify-content: center; gap: 15px;">
                <img src="${clubInfo.logo}" alt="${`${clubInfo.name} logo`}" height="60" width="60" style="border-radius: 50%;" />
                <div>
                    <h1 style="margin: 0; font-size: 28px;">${clubInfo.name}</h1>
                    <p style="margin: 0; font-size: 15px; color: #d4f1f4;">${clubInfo.slogan}</p>
                </div>
            </header>
            
            <section style="padding: 20px; text-align: left;">
                <p>Dear ${memberName},</p>
                <p>
                Congratulations! Your submitted post has been published publicly. Anyone can now read and comment on it. You can easily share the post on social platforms using the button below.
                </p>
                <strong>Post title:</strong> ${postTitle}<br />
                <strong>Post URL:</strong> <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/blogs/view/${slug}">${process.env.NEXT_PUBLIC_APP_BASE_URL}/blogs/view/${slug}</a><br />
                <p>If you have any questions, feel free to reach out to our admin team. We look forward to seeing your contributions and learning together!</p>
            </section>

            <footer style="margin-top: 40px; padding: 20px; background-color: #f0f4f8; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #d1e3f1;">
                <p>
                Facebook: <a href="${clubInfo.social.facebookPage}" style="color: #0077b6; text-decoration: none;">${clubInfo.social.facebookPage}</a><br />
                Website: <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}" style="color: #0077b6; text-decoration: none;">${process.env.NEXT_PUBLIC_APP_BASE_URL}</a><br />
                Phone: ${clubInfo.contacts.phoneNumber}<br>
                Email: <a href="mailto:${clubInfo.contacts.email}" style="color: #0077b6; text-decoration: none;">${clubInfo.contacts.email}</a><br />
                Address: ${clubInfo.address}
                </p>
                <p>&copy; ${today.getFullYear()} ${clubInfo.name}. All rights reserved.</p>
                <p>This email is created by <a href="https://cloudburstlab.vercel.app" target="_blank" style="color: #0077b6; text-decoration: none;">CloudBurst Lab</a>.</p>
            </footer>
            </main>
        </body>
        </html>
    `);
};

export default blogPostApprovalEmailTemplate;