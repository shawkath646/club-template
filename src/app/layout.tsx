import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/config/auth.config";
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
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar clubInfo={clubInfo} session={session} />
        <main className="bg-gradient-to-tr from-blue-500 via-teal-400 to-emerald-500 text-black dark:text-gray-200">
          <div className="min-h-[750px] bg-white/75 dark:bg-black/75 transition-all duration-300 ease-in-out backdrop-blur-md pt-[80px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              {children}
            </div>
          </div>
        </main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
};
