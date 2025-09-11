/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;

// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export', // ensures static export
  basePath: isProd ? '/<your-repo-name>' : '',
  images: {
    unoptimized: true, // GitHub Pages doesn’t support Next.js Image Optimization
  },
}

