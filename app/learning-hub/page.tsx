import type { Metadata } from "next";
import { LearningHub } from "@/components/sections/LearningHub";

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Resources to level up your cloud skills — AWS certifications, workshop archives, Skill Builder, project starter kits, and more from AWS SBG Tulas.",
  alternates: {
    canonical: "/learning-hub",
  },
};

export default function LearningHubPage() {
  return <LearningHub />;
}
