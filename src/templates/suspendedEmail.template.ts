"use server";
import getClubInfo from "@/constant/getClubInfo";

const suspendedEmailTemplate = async ({
    applicantName,
    suspensionReason,
    applicationId,
    nbcId
}: {
    applicantName: string;
    suspensionReason: string;
    applicationId: string;
    nbcId: number;
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
            background: linear-gradient(135deg, #0077b6, #023e8a);
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
            .suspended-box {
            background: linear-gradient(135deg, #f8d7da, #f0f4f8);
            padding: 15px;
            font-size: 18px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #dc3545;
            color: #333;
            }
            .suspended-box strong {
            color: #dc3545;
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
            <img src="https://storage.googleapis.com/club-template-dfe3f.appspot.com/club_logo?GoogleAccessId=firebase-adminsdk-ngld7%40club-template-dfe3f.iam.gserviceaccount.com&Expires=3281968800&Signature=jJJvXAH7l4TxHJELlwD1hJDaoEimJ%2FCvho1N988mimIYbJPBApRqqkQPWr0bJr9H678omV9joV72Sw0u6B6V8%2FWCOXRpGhJ2QYh0MavfJiyrK%2BWKpXgjbavHagWJFZZ7D8Z8qDMR%2Btjfme0qtt4pUiktw2w%2FXX2TMUpnZECeMtElfodl6lerLtunaKyaljgpkUGqLRXtWxCFjyn7IiBP4KdzR%2Fou8WEqEUfvLYAJkMTFMOT1mUVxPiCGiyyfrpk4Tq2zHMkvlMAIme0%2BfkAloJVTy%2Bx3QR254VqoO0Zb06iq7Joxgoe8b2mHrbsCoT4o6Bi9Zzo3Hv5FLKqHLAKcbg%3D%3D" alt="${`${clubInfo.name} logo`}" height="60" width="60" />
            <div>
                <h1>${clubInfo.name}</h1>
                <p>Expanding Science Practice In Narsingdi</p>
            </div>
            </header>
            
            <section class="content">
            <h2>Notice of Suspension, ${applicantName}</h2>
            <p>
                We regret to inform you that your membership in ${clubInfo.name} has been suspended, effective immediately. This decision was made after careful consideration of recent events.
            </p>
            <p><strong>Application ID:</strong> ${applicationId}<br />
            <strong>NBC ID:</strong> ${nbcId}</p>
            <div class="suspended-box">
                <p><strong>Reason for Suspension:</strong> ${suspensionReason}</p>
            </div>
            <p>If you wish to discuss this further or need more information, please contact our admin team.</p>
            <p>We hope for a positive resolution and are available to assist you with any questions.</p>
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

export default suspendedEmailTemplate;
