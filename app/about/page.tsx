import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what the AWS Student Builders Group at Tula's University is about — cloud-first learning, peer-driven community, hackathons, AWS certifications, and building real-world projects on AWS.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
