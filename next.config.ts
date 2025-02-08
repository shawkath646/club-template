/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '**/**',
            },
            {
                protocol: 'https',
                hostname: 'eu.ui-avatars.com',
                port: '',
                pathname: '**/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10MB',
        },
        authInterrupts: true,
    },
};

export default nextConfig;
