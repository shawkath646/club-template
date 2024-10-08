import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

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
                pathname: '**/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10MB',
        },
    },
    webpack: (config) => {
        config.externals.push('@sparticuz/chromium-min', 'puppeteer-core');
        return config;
    },
};

export default bundleAnalyzer(nextConfig);
