import type { NextConfig } from 'next';

// Export statique pour GitHub Pages : le site peut être servi sous /<dépôt>/
const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
