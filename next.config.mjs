/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/documents/verify',
                destination: '/documents&notice/verify-doc',
                permanent: true,
                has: [
                    {
                        type: 'query',
                        key: 'docId',
                    },
                ],
                destination: '/documents&notice/verify-doc?docId=:docId',
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
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
