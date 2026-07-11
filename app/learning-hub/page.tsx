import type { Metadata } from "next";
import { LearningHub } from "@/components/sections/LearningHub";

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Resources to level up — AWS certifications, workshop archives, Skill Builder, project starter kits, and more.",
};

export default function LearningHubPage() {
  return <LearningHub />;
}
