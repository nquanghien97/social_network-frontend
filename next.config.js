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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
        'supports-color': 'commonjs supports-color',
    })
    return config
},
  reactStrictMode: false,
}

module.exports = nextConfig
