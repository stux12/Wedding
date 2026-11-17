import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Accounts from "@/components/Accounts";
import Share from "@/components/Share";
import type { Metadata } from "next";
import { wedding } from "@/config/wedding";
import { getSiteUrl, shareTitle, shareDescription } from "@/lib/site";

const description = shareDescription.replace(/\n/g, " · ");

export const metadata: Metadata = {
  title: shareTitle,
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: shareTitle,
    description,
    url: "/",
    images: [{ url: wedding.images.og, width: 1200, height: 630, alt: shareTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: [wedding.images.og],
  },
};

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Accounts />
      <Share siteUrl={getSiteUrl()} title={shareTitle} description={shareDescription} />
    </main>
  );
}
