"use server";
import getClubInfo from "@/constant/getClubInfo";

const approvedEmailTemplate = async ({
  applicantName,
  applicationId,
  applicantPosition,
  nbcId,
  password,
  specialNote,
  isNewUser
}: {
  applicantName: string;
  applicationId: string;
  applicantPosition: string[];
  nbcId: number;
  password: string;
  specialNote?: string;
  isNewUser: boolean;
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
            <h2 style="color: #0077b6; margin-bottom: 15px;">Welcome to ${clubInfo.name}!</h2>
            <p>Dear ${applicantName},</p>
            <p>
              We are excited to inform you that your application to join ${clubInfo.name} has been approved! Your journey with us begins now, and we are thrilled to have you as part of our team.
            </p>
            <p>
              <strong>Application ID:</strong> ${applicationId}<br />
              <strong>Position:</strong> ${applicantPosition.join(", ")}<br />
              ${specialNote ? `<strong>Special Note:</strong> ${specialNote}` : ""}
            </p>
            <p>To access the portal, please use the following details:</p>
            <div style="background-color: #e0f7fa; padding: 15px; font-size: 18px; margin: 20px 0; border-radius: 8px; border: 1px solid #90e0ef; color: #0077b6;">
              <p style="margin: 0"><strong>NBC ID:</strong> ${nbcId}</p>
              <p style="margin: 0"><strong>Password:</strong> ${password}</p>
            </div>
            <p>Please use this ID and password to log in and set up your account.</p>
            ${isNewUser ? `
              <p>Your next step:</p>
              <div style="background-color: #e0f7fa; padding: 15px; font-size: 18px; margin: 20px 0; border-radius: 8px; border: 1px solid #90e0ef; color: #0077b6;">
                1. <a href="${clubInfo.social.messengerGroupPublic}" target="_blank" style="color: #0077b6; text-decoration: none; font-weight: 500;">Join our messenger community</a><br />
                2. <a href="${clubInfo.social.facebookGroup}" target="_blank" style="color: #0077b6; text-decoration: none; font-weight: 500;">Join our Facebook community</a>
              </div>
            ` : ""}
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

export default approvedEmailTemplate;