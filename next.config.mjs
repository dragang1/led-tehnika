import path from 'path';
import { fileURLToPath } from 'url';
import { legacyRedirects } from './redirects.config.js';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverExternalPackages: ['@keystatic/core'],
    outputFileTracingIncludes: {
        '/api/cms': ['./content/**/*', './keystatic.config.js'],
        '/api/keystatic/[...params]': ['./content/**/*', './keystatic.config.js'],
        '/*': ['./content/**/*', './keystatic.config.js'],
    },
    turbopack: {
        root: projectRoot,
    },
    async redirects() {
        return legacyRedirects;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ledtehnika.com',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        qualities: [75, 80],
    },
};

export default nextConfig;
