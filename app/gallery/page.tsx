import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from AWS Student Builder Group workshops, hackathons, study jams, and community events.",
};

export default function GalleryPage() {
  return <Gallery />;
}
