/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
  }
}

module.exports = nextConfig
