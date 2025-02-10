import type { MetadataRoute } from 'next';
import { getPartialBlogPosts } from '@/backend/blogPosts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL ?? '';

    const { blogPosts } = await getPartialBlogPosts(undefined, true);

    const blogPostsSitemap: MetadataRoute.Sitemap = blogPosts.map((item) => ({
        url: `${baseUrl}/blogs/view/${item.slug}`,
        lastModified: item.timestamp,
        changeFrequency: 'monthly',
        priority: 0.9,
        //images: [item.thumbnail],
    }));

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date('2024-11-01'),
            changeFrequency: 'never',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/join`,
            lastModified: new Date('2024-11-01'),
            changeFrequency: 'never',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/members`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date('2025-02-08'),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date('2025-02-08'),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];
    return [...blogPostsSitemap, ...staticPages];
}
