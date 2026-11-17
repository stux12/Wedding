import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Greeting />
      <Calendar />
      <Gallery />
    </main>
  );
}
