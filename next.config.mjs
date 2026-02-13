/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'nextjs.org',
            },
            {
                protocol: 'https',
                hostname: 'companieslogo.com',
            },
            {
                protocol: 'https',
                hostname: 'logo.clearbit.com',
            },
        ],
    },
};

export default nextConfig;
