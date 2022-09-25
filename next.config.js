/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.knautzfamilywi.com/CareFinder-1.0.0/api/:path*',
      }
    ]
  }
}

module.exports = nextConfig
