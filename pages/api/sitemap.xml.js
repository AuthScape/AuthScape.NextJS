import { generateSitemap, fetchDynamicPages } from '../../utils/sitemap';

export default async function handler(req, res) {
  try {
    // Fetch dynamic URLs from your API service
    const data = await fetchDynamicPages();

    // Generate the sitemap XML
    const sitemap = generateSitemap(data);

    // Set headers for XML response
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

    // Return the sitemap
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
