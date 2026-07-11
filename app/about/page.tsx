import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what the AWS Student Builder Group is about — cloud-first learning, peer-driven community, hackathons, and certification support.",
};

export default function AboutPage() {
  return <About />;
}
