import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.icloud.com" },
      { protocol: "https", hostname: "drive.amazonaws.com" },
    ],
  },
};

export default nextConfig;
