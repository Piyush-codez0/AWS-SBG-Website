import { Hero } from "@/components/sections/Hero";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection";
import CurvedLoop from "@/components/ui/CurvedLoop";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative bg-bg overflow-hidden">
        <CurvedLoop
          marqueeText="AWS ✦ STUDENT ✦ BUILDER ✦ GROUP ✦ TULA'S ✦"
          speed={1}
          curveAmount={120}
          direction="right"
          interactive={true}
        />
      </section>
      <ScrollRevealSection />
    </>
  );
}