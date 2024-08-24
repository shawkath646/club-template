import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import applicationInfo from "@/constant/applicaiton-info.json";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: " | " + applicationInfo.name,
    default: applicationInfo.name
  },
  applicationName: "Club template",
  authors: {
    name: "Shawkat Hossain Maruf",
    url: new URL("https://sh-portfolio-maker.vercel.app/p/shawkath646")
  },
  category: "Science",
  creator: "Shawkat Hossain Maruf <https://sh-portfolio-maker.vercel.app/p/shawkath646>",
  publisher: "CloudBurst Lab <https://cloudburstlab.vercel.app>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
