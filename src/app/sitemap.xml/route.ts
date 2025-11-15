import { NextResponse } from "next/server";

const SITE_URL = "https://datisyn.com";

/**
 * Serve a simple dynamic sitemap at /sitemap.xml
 * - Avoids fragment (hash) URLs
 * - Easy to extend: add pages to `staticUrls` or generate programmatically from a CMS/filesystem
 */
export async function GET() {
  // Static list of pages to index. Do NOT include anchor/hash fragments (#about etc.).
  const staticUrls = [
    { loc: `${SITE_URL}/`, priority: 1.0 },
    // Add real paths here when you create route pages, e.g.:
    // { loc: `${SITE_URL}/pricing`, priority: 0.8 },
    // { loc: `${SITE_URL}/about`, priority: 0.8 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    staticUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // prevent caching for quick verification; remove or tune caching in production
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
