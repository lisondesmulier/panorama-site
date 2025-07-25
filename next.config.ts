import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'panorama-cms.onrender.com'],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;


