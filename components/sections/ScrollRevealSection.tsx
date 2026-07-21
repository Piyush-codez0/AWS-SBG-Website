import { ScrollReveal } from "@/components/lightswind/scroll-reveal";

export function ScrollRevealSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg">
      <ScrollReveal
        size="2xl"
        align="center"
        variant="primary"
        enableBlur
        baseOpacity={0.05}
        baseRotation={3}
        staggerDelay={0.07}
        duration={0.6}
        containerClassName="max-w-4xl mx-auto px-6"
      >
        Learn cloud, build projects, and grow together — powered by AWS.
      </ScrollReveal>
    </section>
  );
}
