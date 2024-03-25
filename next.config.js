/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'social.webestica.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  reactStrictMode: false,
}

module.exports = nextConfig
