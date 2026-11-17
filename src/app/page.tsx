import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Accounts from "@/components/Accounts";
import Share from "@/components/Share";
import { getSiteUrl, shareTitle, shareDescription } from "@/lib/site";

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
