/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // This explicitly instructs the hosting server and browsers to let Supabase run its dynamic scripts
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline' 'unsafe-eval' https://*.supabase.co; img-src * data: blob: 'unsafe-inline' https://*.supabase.co; style-src * 'unsafe-inline';",
          },
        ],
      },
    ]
  },
};

export default nextConfig;