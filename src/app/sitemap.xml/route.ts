import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Ensure this route runs in the Node.js runtime so filesystem access works
export const runtime = "nodejs";

const SITE_URL = "https://datisyn.com";

/**
 * Serve a dynamic sitemap at /sitemap.xml
 * - Auto-discovers `page.*` files under `src/app` and turns them into routes
 * - Skips API routes, grouped/parallel route folders (starting with '('), and dynamic segments ([...])
 * - If filesystem access fails, falls back to a minimal static list
 */
async function collectAppPages(): Promise<string[]> {
  const pages: string[] = [];
  const root = path.join(process.cwd(), "src", "app");

  async function walk(dir: string, urlPrefix = "") {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
      // if the app folder isn't present or readable, return empty and let caller fallback
      return;
    }

    // If this directory contains a page.* file, register the URL for this folder
    const pageFiles = entries.filter(e => e.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(e.name));
    if (pageFiles.length > 0) {
      // root page maps to '/'
      const url = urlPrefix === "" ? "/" : `/${urlPrefix}`;
      pages.push(url);
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      // skip API routes, grouped/parallel route folders and dynamic segments
      if (name === "api" || name.startsWith("(") || name.includes("[")) continue;

      const childDir = path.join(dir, name);
      const childPrefix = urlPrefix === "" ? name : `${urlPrefix}/${name}`;
      await walk(childDir, childPrefix);
    }
  }

  await walk(root, "");
  return pages;
}

export async function GET() {
  // default fallback list (keeps current behaviour if FS-access is unavailable)
  const fallbackUrls = [{ loc: `${SITE_URL}/`, priority: 1.0 }];

  let urls: { loc: string; priority: number }[] = [];
  try {
    const pages = await collectAppPages();
    if (pages.length === 0) {
      urls = fallbackUrls;
    } else {
      urls = pages.map(p => ({ loc: `${SITE_URL}${p}`, priority: p === "/" ? 1.0 : 0.7 }));
    }

    // Include dynamic blog URLs from a local JSON data source (example)
    try {
      const postsPath = path.join(process.cwd(), "src", "data", "posts.json");
      const postsRaw = await fs.readFile(postsPath, "utf8");
      const posts = JSON.parse(postsRaw) as Array<{ slug: string }>;
      for (const post of posts) {
        const loc = `${SITE_URL}/blog/${post.slug}`;
        // avoid duplicates
        if (!urls.find(u => u.loc === loc)) {
          urls.push({ loc, priority: 0.6 });
        }
      }
    } catch (e) {
      // ignore if posts file is missing or malformed
    }
  } catch (err) {
    // On any unexpected error, return the fallback
    urls = fallbackUrls;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // prevent caching for quick verification; remove or tune caching in production
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
