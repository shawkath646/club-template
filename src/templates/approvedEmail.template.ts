"use server";
import getClubInfo from "@/constant/getClubInfo";

const approvedEmailTemplate = async ({
  applicantName,
  applicationId,
  applicantPosition,
  nbcId, password
}: {
  applicantName: string;
  applicationId: string;
  applicantPosition: string;
  nbcId: number;
  password: string;
}) => {

  const clubInfo = await getClubInfo();

  return `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #3b82f6;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
      color: #333333;
    }
    .content h2 {
      color: #3b82f6;
    }
    .footer {
      margin-top: 30px;
      padding: 10px 20px;
      background-color: #f4f4f4;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
    .password-box {
      background-color: #f3f4f6;
      padding: 10px;
      font-size: 18px;
      text-align: center;
      margin: 20px 0;
      border-radius: 8px;
      color: #3b82f6;
    }
    .link {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <h1>${clubInfo.name}</h1>
    </div>

    <!-- Content Section -->
    <div class="content">
      <h2>Welcome to ${clubInfo.name}!</h2>
      <p>Dear ${applicantName},</p>
      <p>
        We are excited to inform you that your application to join ${clubInfo.name} has been approved! Your journey with us begins now, and we are thrilled to have you as part of our team.
      </p>
      <p>
        <strong>Application ID:</strong> ${applicationId}<br>
        <strong>Position:</strong> ${applicantPosition}
      </p>
      <p>
        To access the portal, please use the following details:
      </p>
      <div class="password-box">
        <strong>NBC ID:</strong> ${nbcId}<br>
        <strong>Temporary Password:</strong> ${password}
      </div>
      <p>
        Please use this NBC ID and temporary password to log in and set up your account. For security purposes, we recommend changing your password upon first login.
      </p>
      <p>If you have any questions, feel free to reach out to our admin team. We look forward to seeing your contributions and learning together!</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>&copy; 2024 ${clubInfo.name}. All rights reserved.</p>
      <p>
        Facebook: <a href="${clubInfo.social.facebookPage}" class="link">${clubInfo.social.facebookPage}</a><br>
        Website: <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}" class="link">${process.env.NEXT_PUBLIC_APP_BASE_URL}</a><br>
        Phone: ${clubInfo.contacts.phoneNumber}<br>
        Email: <a href="mailto:${clubInfo.contacts.email}" class="link">${clubInfo.contacts.email}</a>
      </p>
      <p>This email is created by CloudBurst Lab Application.</p>
    </div>
  </div>
</body>
</html>

    `;
};

export default approvedEmailTemplate;