Datisyn logo assets

Files added to `public/`:
- `logo.svg` — primary wordmark (light background)
- `logo-mark.svg` — compact square icon (mark only)
- `logo-dark.svg` — wordmark optimized for dark backgrounds

Colors and usage
- Primary gradient: #2AB3FF -> #0066FF
- Accent nodes: #FFD166 (yellow), #7AE582 (green)
- Wordmark color (light): #0B2545
- Wordmark color (dark): #E6F6FF

How to preview
- Start the dev server and open these paths in your browser:
  - http://localhost:3000/logo.svg
  - http://localhost:3000/logo-mark.svg
  - http://localhost:3000/logo-dark.svg

Additional variants (added):
- `logo-geometric.svg` — geometric mark + wordmark (clean grid/shape style)
 - `logo-geometric.svg` — geometric mark (mark-only) — wordmark removed
 - `logo-geometric.svg` — geometric mark (mark-only) — wordmark removed
 - `logo-refined.svg` — refined mark that matches the concentric diamond style (dark square + cyan rings)
- `logo-wordmark.svg` — wordmark-only variant with gradient initial
- `logo-monogram.svg` — compact monogram (D+S) in a square

Preview the new variants:
  - http://localhost:3000/logo-geometric.svg
  - http://localhost:3000/logo-wordmark.svg
  - http://localhost:3000/logo-monogram.svg

How to use in React/Next.js
- Place the SVGs in `public/` and reference them directly in an <img> tag or as a background-image:

```jsx
// img tag
<img src="/logo.svg" alt="Datisyn logo" width={240} />

// CSS background
.header { background-image: url('/logo.svg'); background-size: contain; }
```

Next steps
- I can export PNG/WEBP variants if you need raster assets for email or external use.
- If you want alternate color palettes or iterations, tell me the style direction (minimal, geometric, playful, corporate).
