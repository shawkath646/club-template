"use server";
import getClubInfo from "@/constant/getClubInfo";

const approvedEmailTemplate = async ({
  applicantName,
  applicationId,
  applicantPosition,
  nbcId,
  password,
  specialNote
}: {
  applicantName: string;
  applicationId: string;
  applicantPosition: string;
  nbcId: number;
  password: string;
  specialNote?: string;
}) => {

  const clubInfo = await getClubInfo();

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #e0f7fa, #e0eafc);
            color: #333;
            line-height: 1.6;
          }
          main {
            max-width: 650px;
            margin: 40px auto;
            padding: 20px;
            background: linear-gradient(135deg, #ffffff, #f0f4f8);
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: box-shadow 0.3s ease-in-out;
          }
          main:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }
          header {
            background: linear-gradient(135deg, #00b4d8, #0077b6);
            padding: 25px;
            border-radius: 12px 12px 0 0;
            color: #ffffff;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }
          header img {
            border-radius: 50%;
          }
          header h1 {
            margin: 0;
            font-size: 28px;
          }
          header p {
            margin: 0;
            font-size: 15px;
            color: #d4f1f4;
          }
          .content {
            padding: 20px;
            text-align: left;
          }
          .content h2 {
            color: #0077b6;
            margin-bottom: 15px;
          }
          .content p {
            margin-bottom: 15px;
          }
          .password-box {
            background: linear-gradient(135deg, #e0f7fa, #cfe9ff);
            padding: 15px;
            font-size: 18px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #90e0ef;
            color: #0077b6;
          }
          .password-box strong {
            color: #000;
          }
          .link {
            color: #0077b6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .link:hover {
            color: #00b4d8;
            text-decoration: underline;
          }
          footer {
            margin-top: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #e0f4fa, #f0f4f8);
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            border-top: 1px solid #d1e3f1;
          }
          footer a {
            color: #0077b6;
            text-decoration: none;
          }
          footer a:hover {
            color: #00b4d8;
            text-decoration: underline;
          }
          footer p {
            margin: 5px 0;
          }
          .mb-3 {
            margin-bottom: 0.75rem;
          }
        </style>
      </head>
      <body>
        <main>
          <header>
            <img src="${clubInfo.logo}" alt="${`${clubInfo.name} logo`}" height="60" width="60" />
            <div>
              <h1>${clubInfo.name}</h1>
              <p>${clubInfo.slogan}</p>
            </div>
          </header>
          
          <section class="content">
            <h2>Welcome to ${clubInfo.name}!</h2>
            <p>Dear ${applicantName},</p>
            <p>
              We are excited to inform you that your application to join ${clubInfo.name} has been approved! Your journey with us begins now, and we are thrilled to have you as part of our team.
            </p>
            <p>
              <strong>Application ID:</strong> ${applicationId}<br />
              <strong>Position:</strong> ${applicantPosition}<br />
              ${specialNote ? `<strong>Special Note:</strong> ${specialNote}` : ""}
            </p>
            <p>To access the portal, please use the following details:</p>
            <div class="password-box">
              <p><strong>ID:</strong> ${nbcId}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
            <p>Your next step:</p>
            <div class="password-box">
              1. <a href="${clubInfo.social.messengerGroupPublic}" target="_blank" class="link">Join our messenger community</a><br />
              2. <a href="${clubInfo.social.facebookGroup}" target="_blank" class="link">Join our Facebook community</a>
            </div>
            <p>Please use this ID and password to log in and set up your account.</p>
            <p>If you have any questions, feel free to reach out to our admin team. We look forward to seeing your contributions and learning together!</p>
          </section>

          <footer>
            <p>&copy; 2024 ${clubInfo.name}. All rights reserved.</p>
            <p>
              Facebook: <a href="${clubInfo.social.facebookPage}" class="link">${clubInfo.social.facebookPage}</a><br />
              Website: <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}" class="link">${process.env.NEXT_PUBLIC_APP_BASE_URL}</a><br />
              Phone: ${clubInfo.contacts.phoneNumber}<br>
              Email: <a href="mailto:${clubInfo.contacts.email}" class="link">${clubInfo.contacts.email}</a><br />
              Address: ${clubInfo.address}
            </p>
            <p>This email is created by <a href="https://cloudburstlab.vercel.app" target="_blank" class="link">CloudBurst Lab</a>.</p>
          </footer>
        </main>
      </body>
    </html>
  `);
};

export default approvedEmailTemplate;