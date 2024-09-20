/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/documents/verify',
                destination: '/documents&notice/verify-doc?docId=:docId',
                permanent: true,
                has: [
                    {
                        type: 'query',
                        key: 'docId',
                    },
                ],
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10MB',
        },
    },
};

export default nextConfig;
