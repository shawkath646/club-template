import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { getSession } from "@/backend/auth";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import getClubInfo from "@/constant/getClubInfo";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const clubInfo = await getClubInfo();
  return {
    title: {
      template: "%s | " + clubInfo.name,
      default: clubInfo.name
    },
    applicationName: clubInfo.name,
    authors: {
      name: "Shawkat Hossain Maruf",
      url: new URL("https://sh-portfolio-maker.vercel.app/p/shawkath646")
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL as string),
    category: "Science",
    creator: "Shawkat Hossain Maruf <https://sh-portfolio-maker.vercel.app/p/shawkath646>",
    publisher: "CloudBurst Lab <https://cloudburstlab.vercel.app>",
  };
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const clubInfo = await getClubInfo();
  const session = await getSession();

  return (
    <html lang="en">
      <head>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Navbar clubInfo={clubInfo} session={session} />
        <main className="bg-gradient-to-tr from-blue-500 dark:from-blue-950 via-teal-500 dark:via-teal-950 to-emerald-500 dark:to-emerald-950 text-black dark:text-gray-200 overflow-x-hidden">
          <div className="container min-h-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-[80px]">
            {children}
          </div>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
};
