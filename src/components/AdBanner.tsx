"use client";
import { useEffect } from "react";

interface AdsBannerProps {
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive": boolean;
  "data-ad-layout"?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner(props: AdsBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ins
      key={props["data-ad-slot"]}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={"ca-pub-" + process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
      {...props}
    />
  );
}
