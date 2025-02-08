"use server";
import getClubInfo from "@/constant/getClubInfo";

const updatedPositionEmail = async ({
    applicantName,
    oldPosition,
    newPosition
} : {
    applicantName: string;
    oldPosition: string;
    newPosition: string;
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
                        color: #00a8e8;
                        margin-bottom: 15px;
                    }
                    .content p {
                        margin-bottom: 15px;
                    }
                    .position-box {
                        background: linear-gradient(135deg, #f3f8ff, #f0f4f8);
                        padding: 15px;
                        font-size: 18px;
                        margin: 20px 0;
                        border-radius: 8px;
                        border: 1px solid #0077b6;
                        color: #333;
                    }
                    .position-box strong {
                        color: #0077b6;
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
                    <p>Expanding Science Practice In Narsingdi</p>
                </div>
                </header>
                
                <section class="content">
                    <h2>Updated Position Notice, ${applicantName}</h2>
                    <p>
                        We are pleased to inform you that your position within ${clubInfo.name} has been updated. This change reflects your growing contributions and potential within our team. Below are the details of the update:
                    </p>
                    <div class="position-box">
                        <p><strong>Previous Position:</strong> ${oldPosition}</p>
                        <p><strong>New Position:</strong> ${newPosition}</p>
                    </div>
                    <p>We are excited to see your continued progress and contributions in your new role!</p>
                    <p>If you have any questions or need further clarification, please don't hesitate to reach out to our admin team.</p>
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

export default updatedPositionEmail;