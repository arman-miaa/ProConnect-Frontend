import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // you can increase to "10mb" or "20mb"
    },
  },
};

export default nextConfig;
