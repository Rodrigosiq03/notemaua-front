/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@acme/ui', 'lodash-es'],
  env: {
    NEXT_PUBLIC_STAGE: process.env.NEXT_PUBLIC_STAGE,
  },
};

module.exports = nextConfig;
