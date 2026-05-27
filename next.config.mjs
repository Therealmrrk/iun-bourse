/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // We remove the complex headers block entirely to stop the build compilation from crashing your Tailwind styles!
};

export default nextConfig;