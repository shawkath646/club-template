import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin-tools/',
    },
    sitemap:  process.env.NEXT_PUBLIC_APP_BASE_URL + "/sitemap.xml",
  }
}