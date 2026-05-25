/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase body size limit for file uploads handled through API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig
