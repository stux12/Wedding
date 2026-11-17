import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Accounts from "@/components/Accounts";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Accounts />
    </main>
  );
}
