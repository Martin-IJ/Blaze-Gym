// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://gym-api-d0yw.onrender.com/:path*', // Proxy to Backend
        },
      ];
    },
  };
  
  export default nextConfig;