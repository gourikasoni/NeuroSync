import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 💥 disables linting in Vercel builds
  },
  // you can keep/add other options here
};

export default nextConfig;
