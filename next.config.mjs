/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
