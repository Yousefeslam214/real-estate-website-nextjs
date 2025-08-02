/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    staleTime: {
      Dynamic: 30 * 1000, // 30 seconds in milliseconds
    },
  },
};

module.exports = nextConfig;
