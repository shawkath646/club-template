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
    experimental: {
        serverActions: {
            bodySizeLimit: '10MB',
        },
    },
};

export default nextConfig;
