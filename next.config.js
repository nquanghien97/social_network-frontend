/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'social.webestica.com'
      },
    ]
  }
}

module.exports = nextConfig
