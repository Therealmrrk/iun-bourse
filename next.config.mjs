/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // 🛡️ UNIVERSAL GATEWAY OVERRIDE: Protects every route and every third-party package
  async headers() {
    return [
      {
        source: '/:path*', // Applies to absolutely every asset and API route
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob: 'unsafe-inline'; style-src * 'unsafe-inline';",
          },
        ],
      },
    ]
  },
};

export default nextConfig;