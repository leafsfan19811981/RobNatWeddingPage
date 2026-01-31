/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allows loading hero image from the venue website (used as background).
    remotePatterns: [
      { protocol: 'https', hostname: 'www.maplehillfarm.ca' },
      { protocol: 'https', hostname: 'i0.wp.com' },
    ],
  },
};

module.exports = nextConfig;
