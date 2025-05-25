/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.174.164:3000"],
    },
  },
  // Allow cross-origin requests from your local network
  allowedDevOrigins: [
    "192.168.174.164",
    "localhost",
    "127.0.0.1",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true,
  },
}

export default nextConfig
