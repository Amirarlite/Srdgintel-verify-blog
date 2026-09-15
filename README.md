# SRDG Intel — news / government affairs site

Astro site scaffold, built to deploy on Cloudflare Pages as a subdomain of srdgintel.com.

## Local setup

```
npm install
npm run dev
```

## Adding an article

Drop a new file in `src/content/articles/` — Markdown (`.md`) or MDX (`.mdx`). Raw HTML content
can be pasted into the body of a `.md` file directly (Markdown passes through raw HTML), or
imported as a standalone component if you'd rather keep full HTML files.

Frontmatter fields (see `src/content/config.ts`):
- `title`, `dek`, `column` (`news` | `government-affairs` | `verified`), `pubDate`, `author`, `verified`
- Optional `faq` array — each `{ question, answer }` pair automatically renders on the page
  and feeds the `FAQPage` JSON-LD block for Google's FAQ rich result.

## SEO / structured data

- `src/components/seo/` holds the four JSON-LD templates: Organization (site-wide),
  NewsArticle, BreadcrumbList, and FAQPage (article-level).
- `@astrojs/sitemap` generates `sitemap-index.xml` automatically on build.
- Before launch, validate a live article URL at
  https://search.google.com/test/rich-results

## Deploying to Cloudflare

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → connect the repo.
3. Build command: `npm run build`. Build output directory: `dist`.
4. Framework preset: Astro.
5. Custom domains → add `intel.srdgintel.com` (or your chosen subdomain) — since it's
   already in the same Cloudflare account/zone as srdgintel.com, the CNAME is added
   automatically.
6. Update `SITE_URL` in `astro.config.mjs` to match the final subdomain before the first deploy.

## Brand

- Ink navy `#10233B` — text, headlines, logo
- Verified gold `#A9740A` — links, tags, the only accent color
- Page background `#F4F1EA`, card surface `#FFFFFF`
