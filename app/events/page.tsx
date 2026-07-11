import type { Metadata } from "next";
import { Events } from "@/components/sections/Events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming workshops, hackathons, study jams, and build days from the AWS Student Builder Group.",
};

export default function EventsPage() {
  return <Events />;
}
