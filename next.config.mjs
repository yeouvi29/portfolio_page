/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: [
    {
      source: "(.*)/api/graphql",
      destination: "/api/graphql",
    },
  ],
};

export default nextConfig;
