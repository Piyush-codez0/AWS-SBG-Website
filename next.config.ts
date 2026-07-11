import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/AWS-SBG-Website" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/AWS-SBG-Website/" : "",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
