/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/en/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
