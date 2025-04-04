/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Helps catch potential issues in development
    images: {
        domains: ['led-backend-62tj.onrender.com'], // Allow images from your backend
        remotePatterns: [
            {
                protocol: 'https', // Make sure to use https for Render
                hostname: 'localhost',
                port: '1337', // Adjust if you're running on a different port locally
                pathname: '/**', // Allow all paths for local development
            },
        ],
    },
};




export default nextConfig;
