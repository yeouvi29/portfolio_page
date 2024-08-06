/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    if (process.env.NEXT_PUBLIC_DISABLE_REDIRECTS === "true") {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
        permanent: false,
      },
      {
        source: "/:path((?!api/).*)",
        destination: "https://portfolio.tokozzing.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
