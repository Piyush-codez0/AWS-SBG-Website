import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://sbg.yourcollege.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AWS Student Builder Group",
    template: "%s · AWS Student Builder Group",
  },
  description:
    "The official AWS Student Builder Group — a community of student builders learning cloud, AI, and software through hands-on projects, workshops, and mentorship.",
  keywords: [
    "AWS Student Builder Group",
    "AWS Cloud Club",
    "student developer community",
    "cloud computing",
    "AWS certifications",
    "hackathons",
  ],
  openGraph: {
    title: "AWS Student Builder Group",
    description:
      "A community of student builders learning cloud, AI, and software through hands-on projects, workshops, and mentorship.",
    url: siteUrl,
    siteName: "AWS Student Builder Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Builder Group",
    description:
      "A community of student builders learning cloud, AI, and software through hands-on projects, workshops, and mentorship.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, poppins.variable, "font-sans")}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
