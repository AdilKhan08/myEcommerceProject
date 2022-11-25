/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },env: {
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY,
  },
};

module.exports = nextConfig;
