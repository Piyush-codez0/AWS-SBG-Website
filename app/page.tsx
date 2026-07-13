import { Hero } from "@/components/sections/Hero";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection";
import CurvedLoop from "@/components/ui/CurvedLoop";

export default function Home() {
  return (
    <>
      {/* Hero with circular CurvedLoop overlay anchored to its bottom-centre */}
      <div className="relative">
        <Hero />

        {/* Circular spinning-text badge — overlaps the hero bottom edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 z-20
                     -translate-x-1/2 translate-y-1/2
                     h-[180px] w-[180px]
                     sm:h-[220px] sm:w-[220px]"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          {/* Border ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md" />

          <CurvedLoop
            marqueeText="AWS ✦ STUDENT ✦ BUILDER ✦ GROUP ✦ TULA'S ✦ "
            speed={0.4}
            circular={true}
            direction="left"
            interactive={false}
          />
        </div>
      </div>

      <ScrollRevealSection />
    </>
  );
}