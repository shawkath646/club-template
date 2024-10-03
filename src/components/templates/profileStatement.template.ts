"use server";
import { getMemberProfile } from "@/backend/members";
import { formatDate } from "@/utils";

const profileStatementTemplate = async (applicationId: string) => {

    const memberProfile = await getMemberProfile(applicationId);

    const today = new Date();

    return (`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Statement</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    header img {
      width: 100px;
      margin-bottom: 10px;
    }
    header h1 {
      font-size: 24px;
      margin: 0;
    }
    header p {
      font-size: 14px;
      color: #666;
    }
    .info {
      margin-bottom: 40px;
    }
    .info h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .info table {
      width: 100%;
      border-collapse: collapse;
    }
    .info table, .info th, .info td {
      border: 1px solid #ddd;
    }
    .info th, .info td {
      padding: 12px;
      text-align: left;
    }
    .info th {
      background-color: #f4f4f4;
    }
    footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    .warning {
      font-size: 12px;
      color: red;
      margin-top: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <header>
      <img src="logo.png" alt="Website Logo" />
      <h1>Profile Statement</h1>
      <p>Website Name | Slogan</p>
      <p>Address | Email: info@example.com | Phone: +123-456-7890</p>
      <p><strong>Date:</strong> <span>${today.toLocaleDateString()}</span> | <strong>Generated at:</strong> <span>${today.toLocaleTimeString()}</span></p>
    </header>

    <!-- Profile Information Section -->
    <div class="info">
      <h2>Personal Information</h2>
      <table>
        <tr>
          <th>Full Name</th>
          <td>${memberProfile.personal.fullName}</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td>${formatDate(memberProfile.personal.dateOfBirth as Date)}</td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>${memberProfile.personal.gender}</td>
        </tr>
        <tr>
          <th>Father's Name</th>
          <td>${memberProfile.personal.fatherName}</td>
        </tr>
        <tr>
          <th>Mother's Name</th>
          <td>${memberProfile.personal.motherName}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>${memberProfile.personal.address}</td>
        </tr>
      </table>

      <h2>Identification</h2>
      <table>
        <tr>
          <th>Email</th>
          <td><a href="mailto:${memberProfile.identification.email}" target="_blank">${memberProfile.identification.email}</a></td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>${memberProfile.identification.phoneNumber}</td>
        </tr>
        <tr>
          <th>Identification No</th>
          <td>${memberProfile.identification.identificationNo}</td>
        </tr>
        <tr>
          <th>Facebook Profile Link</th>
          <td><a href="${memberProfile.identification.fbProfileLink}" target="_blank">${memberProfile.identification.fbProfileLink}</a></td>
        </tr>
      </table>

      <h2>Educational Information</h2>
      <table>
        <tr>
          <th>Institute</th>
          <td>{{institute}}</td>
        </tr>
        <tr>
          <th>Institute Address</th>
          <td>{{instituteAddress}}</td>
        </tr>
        <tr>
          <th>Student ID</th>
          <td>{{studentID}}</td>
        </tr>
        <tr>
          <th>Background</th>
          <td>{{background}}</td>
        </tr>
        <tr>
          <th>Present Class</th>
          <td>{{presentClass}}</td>
        </tr>
      </table>

      <h2>Club Information</h2>
      <table>
        <tr>
          <th>Club ID</th>
          <td>{{nbcId}}</td>
        </tr>
        <tr>
          <th>Position</th>
          <td>{{position}}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{status}}</td>
        </tr>
        <tr>
          <th>Joined On</th>
          <td>{{joinedOn}}</td>
        </tr>
        <tr>
          <th>Permissions</th>
          <td>{{permissions}}</td>
        </tr>
        <tr>
          <th>Interested In</th>
          <td>{{interestedIn}}</td>
        </tr>
        <tr>
          <th>Extra Curricular Activities</th>
          <td>{{extraCurricularActivities}}</td>
        </tr>
        <tr>
          <th>Reason for Joining</th>
          <td>{{reason}}</td>
        </tr>
      </table>
    </div>

    <!-- Warning Section -->
    <div class="warning">
      <p>This PDF contains sensitive data. Do not share without proper authorization.</p>
    </div>

    <footer>
      <p>&copy; 2022 - ${today.getFullYear()} All rights reserved by Narsingdi Biggan Club</p>
      <p>This HTML is created by <a href="https://cloudburstlab.vercel.app" target="_blank">Cloudburst Lab</a></p>
    </footer>
  </div>
</body>
</html>
    `);
};

export default profileStatementTemplate;