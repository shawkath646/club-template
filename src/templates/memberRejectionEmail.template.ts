"use server";
import getClubInfo from "@/constant/getClubInfo";

const rejectionEmailTemplate = async ({
    applicantName,
    rejectionReason,
    applicationId,
    applicantPosition
  }: {
    applicantName: string;
    applicationId: string;
    applicantPosition: string[];
    rejectionReason?: string;
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
                    
                    <section class="content" style="padding: 20px; text-align: left;">
                        <h2 style="margin-bottom: 15px;"><span style="color: #d62828; ">We regret to inform you,</span> ${applicantName}</h2>
                        <p style="margin-bottom: 15px;">
                            After careful consideration, we regret to inform you that your application to join <strong>${clubInfo.name}</strong> as <strong>${applicantPosition.join(", ")}</strong> with <strong>application ID: ${applicationId}</strong> has not been successful at this time. While we were impressed with your enthusiasm and background, we had to make some difficult decisions due to limited space and specific selection criteria.
                        </p>
                        <p style="background: linear-gradient(135deg, #ffe5e5, #f0f4f8); padding: 15px; font-size: 18px; margin: 20px 0; border-radius: 8px; border: 1px solid #ff6b6b;">
                            <strong style=" color: #d62828;">Reason for Rejection:</strong> ${rejectionReason}
                        </p>
                        <p style="margin-bottom: 15px;">If you have any further questions or require more information, feel free to reach out to our admin team. We value your interest in ${clubInfo.name}, and we encourage you to apply again in the future.</p>
                        <p style="margin-bottom: 15px;">Thank you again for your interest. We wish you all the best in your future endeavors.</p>
                    </section>

                    <footer style="margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #e0f4fa, #f0f4f8); text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #d1e3f1;">
                        <p style="margin: 5px 0;">
                            Facebook: <a href="${clubInfo.social.facebookPage}" style="color: #0077b6; text-decoration: none;">${clubInfo.social.facebookPage}</a><br />
                            Website: <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}" style="color: #0077b6; text-decoration: none;">${process.env.NEXT_PUBLIC_APP_BASE_URL}</a><br />
                            Phone: ${clubInfo.contacts.phoneNumber}<br>
                            Email: <a href="mailto:${clubInfo.contacts.email}" style="color: #0077b6; text-decoration: none;">${clubInfo.contacts.email}</a><br />
                            Address: ${clubInfo.address}
                        </p>
                        <p style="margin: 5px 0;">&copy; ${today.getFullYear()} ${clubInfo.name}. All rights reserved.</p>
                        <p style="margin: 5px 0;">This email is created by <a href="https://cloudburstlab.vercel.app" target="_blank" style="color: #0077b6; text-decoration: none;">CloudBurst Lab</a>.</p>
                    </footer>
                </main>
            </body>
        </html>
    `);
};

export default rejectionEmailTemplate;