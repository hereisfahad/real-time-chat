/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  images: {
    domains: ['github.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
