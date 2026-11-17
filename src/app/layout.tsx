import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import { wedding } from "@/config/wedding";
import { getSiteUrl, shareTitle, shareDescription } from "@/lib/site";
import RevealObserver from "@/components/RevealObserver";
import Toaster from "@/components/Toaster";
import "./globals.css";

const serif = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: shareTitle,
  description: shareDescription.replace(/\n/g, " · "),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: shareTitle,
    description: shareDescription.replace(/\n/g, " · "),
    url: "/",
    images: [{ url: wedding.images.og, width: 1200, height: 630, alt: shareTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription.replace(/\n/g, " · "),
    images: [wedding.images.og],
  },
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f5ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={serif.variable} suppressHydrationWarning>
      <head>
        {/* JS 가 켜져 있을 때만 스크롤 등장 애니메이션을 적용 (꺼져 있으면 그냥 보임) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <Toaster />
      </body>
    </html>
  );
}
