/**
 * Generate XML sitemap from dynamic data
 * @param {Object} data - Data from API containing pages/URLs
 * @returns {string} - XML sitemap string
 */
export function generateSitemap(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com';

  // Static pages - add your static routes here
  const staticPages = [
    {
      url: '/',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: new Date().toISOString()
    },
    {
      url: '/dashboard',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: new Date().toISOString()
    },
    {
      url: '/login',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: new Date().toISOString()
    }
  ];

  // Dynamic pages from API
  // Assuming data has a structure like: { pages: [{slug, updatedAt, priority}] }
  const dynamicPages = data?.pages?.map(page => ({
    url: `/${page.slug}`,
    changefreq: page.changefreq || 'weekly',
    priority: page.priority || '0.7',
    lastmod: page.updatedAt || new Date().toISOString()
  })) || [];

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...dynamicPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

/**
 * Fetch pages from your API service
 * @returns {Promise<Object>} - API response with pages data
 */
export async function fetchDynamicPages() {
  try {
    // Replace with your actual API endpoint
    const apiUrl = process.env.API_SERVICE_URL || 'https://api.yourservice.com/v1/pages';

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching dynamic pages:', error);
    return { pages: [] }; // Return empty array on error
  }
}
