import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import RevealObserver from "@/components/RevealObserver";
import Toaster from "@/components/Toaster";
import "./globals.css";

const serif = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

// 공통(기본) 메타데이터는 일반 문구만. 이름·일정은 청첩장 페이지(page.tsx)에서만 설정해
// 404·안내 페이지 등 다른 화면으로 정보가 새지 않도록 합니다.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "모바일 청첩장",
  description: "모바일 청첩장 준비중입니다.",
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
