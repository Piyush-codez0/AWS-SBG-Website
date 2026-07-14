import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection";

export const metadata: Metadata = {
  title:
    "AWS Student Builders Group at Tula's University | Official AWS Cloud Community",
  description:
    "Official website of AWS Student Builders Group at Tula's University, Dehradun. Join workshops, cloud events, hackathons, AWS learning programs, and student innovation initiatives powered by AWS.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollRevealSection />
    </>
  );
}