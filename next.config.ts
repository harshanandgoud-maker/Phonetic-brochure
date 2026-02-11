import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // outputFileTracingRoot removed to fix Vercel path issue
  typescript: {
    // ignoreBuildErrors: false,
  },

};

export default nextConfig;
