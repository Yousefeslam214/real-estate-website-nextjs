/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.pexels.com", "iyufacxknugsdotvqylk.supabase.co"],
  },
};

module.exports = nextConfig;
