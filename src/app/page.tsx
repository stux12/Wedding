import Hero from "@/components/Hero";
import Greeting from "@/components/Greeting";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Greeting />
      <Calendar />
    </main>
  );
}
