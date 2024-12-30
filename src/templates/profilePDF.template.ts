"use server";
import { cache } from "react";
import { getMemberProfile } from "@/backend/members";
import { formatDate } from "@/utils/utils.backend";
import { capitalizeWords } from "@/utils/utils.backend";
import getClubInfo from "@/constant/getClubInfo";


const profilePDFTemplate = cache(async (applicationId: string) => {

  const clubInfo = await getClubInfo();
  const memberProfile = await getMemberProfile(applicationId);

  const today = new Date();

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${memberProfile.personal.fullName} | Profile Summury</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }

          .page-break-after {
            page-break-after: always;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }

          @media print {
            .container {
              max-width: 100%;
              padding: 0;
              background-color: none
              border-radius: 0;
              box-shadow: none;
            }
          }

          header {
            text-align: center;
            margin-bottom: 45px;
          }

          .header-title {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
          }

          .header-title h1 {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }

          .header-slogan {
            color: #60a5fa;
            font-weight: 400;
            font-size: 15px;
            margin: 0 0 15px;
          }

          .text {
            color: #4b5563;
            font-size: 14px;
            margin: 5px 0;
          }

          .text-right {
            text-align: right;
          }

          .mt-2 {
            margin-top: 10px;
          }

          .info h2 {
            font-size: 22px;
            margin-bottom: 15px;
          }

          .info table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .info th,
          .info td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }

          .info th {
            white-space: nowrap;
          }

          .td-center {
            text-align: center;
            vertical-align: middle;
            width: 100%;
          }

          @media print {
            .info th {
              background-color: #f4f4f4;
              white-space: nowrap;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }

          footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #999;
            border-top: 2px solid #ddd;
            padding-top: 15px;
          }

          footer p {
            margin: 5px 0;
          }

          .warning {
            font-size: 14px;
            color: red;
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <header>
            <div class="header-title">
              <img
                src="${clubInfo.logo}"
                alt="${clubInfo.name} Logo"
                height="60"
                width="60"
              />
              <h1>${clubInfo.name}</h1>
            </div>
            <p class="header-slogan">${clubInfo.slogan}</p>
            <p class="text">
              Email:
              <a href="mailto:${clubInfo.contacts.email}" target="_blank"
                >${clubInfo.contacts.email}</a
              >
              | Phone: ${clubInfo.contacts.phoneNumber}
            </p>
            <p class="text">
              Address: ${clubInfo.address}
            </p>
            <p class="text text-right mt-2">
              <strong>Generated
                at:</strong> ${today.toLocaleString()}
            </p>
            <h2>Member Information</h2>
          </header>

          <!-- Profile Information Section -->
          <div class="info page-break-after">
            <h2>Personal Information</h2>
            <table>
              <tr>
                <th>Picture</th>
                <td class="td-center">
                  <img 
                    src="${memberProfile.personal.picture}" 
                    alt="${memberProfile.personal.fullName} picture" 
                    height="100" 
                    style="display: block; margin: 0 auto;" 
                  />
                </td>
              </tr>
              <tr>
                <th>Full Name</th>
                <td>${memberProfile.personal.fullName}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>${formatDate(memberProfile.personal.dateOfBirth )}</td>
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
                <td>
                  <a href="mailto:${memberProfile.identification.primaryEmail}" target="_blank"
                    >${memberProfile.identification.primaryEmail}</a
                  >
                </td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>${memberProfile.identification.phoneNumber.value}</td>
              </tr>
              <tr>
                <th>Identification No</th>
                <td>${memberProfile.identification.personalIdentificationNo}</td>
              </tr>
              <tr>
                <th>Facebook Profile Link</th>
                <td>
                  <a href="${memberProfile.identification.fbProfileLink}" target="_blank"
                    >${memberProfile.identification.fbProfileLink}</a
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Educational & Club Info Section -->
        <br />
        <div class="container">
          <div class="info">
            <h2>Educational Information</h2>
            <table>
              <tr>
                <th>Institute</th>
                <td>${memberProfile.educational.institute}</td>
              </tr>
              <tr>
                <th>Institute Address</th>
                <td>${memberProfile.educational.instituteAddress}</td>
              </tr>
              <tr>
                <th>Student ID</th>
                <td>${memberProfile.educational.studentID}</td>
              </tr>
              <tr>
                <th>Background</th>
                <td>${memberProfile.educational.background}</td>
              </tr>
              <tr>
                <th>Present Class</th>
                <td>${memberProfile.educational.presentClass}</td>
              </tr>
            </table>

            <h2>Club Information</h2>
            <table>
              <tr>
                <th>NBC ID</th>
                <td>${memberProfile.club.nbcId}</td>
              </tr>
              <tr>
                <th>Position</th>
                <td>${memberProfile.club.position.map(word => capitalizeWords(word)).join(", ")}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>${memberProfile.club.status}</td>
              </tr>
              <tr>
                <th>Joined On</th>
                <td>${formatDate(memberProfile.club.joinedOn)}</td>
              </tr>
              <tr>
                <th>Permissions</th>
                <td>${memberProfile.club.permissions.join(", ")}</td>
              </tr>
              <tr>
                <th>Interested In</th>
                <td>${memberProfile.club.interestedIn}</td>
              </tr>
              <tr>
                <th>Extra Curricular Activities</th>
                <td>${memberProfile.club.extraCurricularActivities}</td>
              </tr>
              <tr>
                <th>Reason for Joining</th>
                <td>${memberProfile.club.reason}</td>
              </tr>
            </table>
          </div>

          <!-- Warning Section -->
          <div class="warning">
            <p>
              ** Information in this document is confidential and must not be shared
              with anyone outside the club without proper authorization **
            </p>
          </div>
        </div>
      </body>
    </html>
  `);
});

export default profilePDFTemplate;