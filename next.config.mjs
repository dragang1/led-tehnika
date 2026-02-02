/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Helps catch potential issues in development
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'led-backend-62tj.onrender.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https', // Make sure to use https for Render
                hostname: 'localhost',
                port: '1337', // Adjust if you're running on a different port locally
                pathname: '/**', // Allow all paths for local development
            },
        ],
        // Image optimization settings
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        qualities: [75, 80],
    },
};




export default nextConfig;