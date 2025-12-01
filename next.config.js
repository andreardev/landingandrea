/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    // Excluir canvas del bundle del servidor
    if (isServer) {
      config.externals = [...(config.externals || []), { canvas: 'canvas' }]
    }
    
    // Resolver problemas con three.js
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-three/fiber': '@react-three/fiber',
    }
    
    return config
  },
}

module.exports = nextConfig

