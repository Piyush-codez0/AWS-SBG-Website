import type { Metadata } from "next";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the students who organise, teach, mentor, and keep the AWS Student Builders Group running at Tula's University, Dehradun.",
  alternates: {
    canonical: "/team",
  },
};

export default function TeamPage() {
  return <Team />;
}
