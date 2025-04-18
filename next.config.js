/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  webpack(config, { isServer }) {
    // Handle font files (AFM and PFB)
    config.module.rules.push({
      test: /\.(afm|pfb)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]',  // Copies fonts to /static/fonts/
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
