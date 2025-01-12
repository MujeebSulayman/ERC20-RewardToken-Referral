/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    config.resolve.alias['@artifacts'] = path.resolve(__dirname, 'artifacts');
    
    config.module.rules.push({
      test: /\.(sol|json)$/,
      type: 'json'
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
