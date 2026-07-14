import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/demo", "/login", "/api/", "/_next/"],
    },
    sitemap: "https://aws-sbg-tulas.vercel.app/sitemap.xml",
  };
}
