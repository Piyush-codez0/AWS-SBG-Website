import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and moments from AWS Student Builders Group workshops, hackathons, study jams, and community events at Tula's University.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
