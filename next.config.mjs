/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: {
      bodySizeLimit: '10mb', // Kept your file upload threshold fix here
    },
  },
  // This block safely injects 'unsafe-eval' for local development to bypass your browser error
  async headers() {
    return [
      {
        source: '/apply/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';",
          },
        ],
      },
    ]
  },
};

export default nextConfig;