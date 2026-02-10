/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swiper'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cms.gobigagency.co',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.gobigagency.co',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
