/** @type {import('next').NextConfig} */
const deployedAddresses = require('../deployed-addresses.json');
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: deployedAddresses.job,
  },
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    forceSwcTransforms: false,
  },
};

module.exports = nextConfig;
