import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// Replace with your live subdomain once it's assigned, 
const SITE_URL = 'https://srdgintel-verify-blog.eliteevault.workers.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
