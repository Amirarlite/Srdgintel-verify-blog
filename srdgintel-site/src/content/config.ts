import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content', // accepts .md, .mdx — raw .html can be dropped in and imported directly in a page if needed
  schema: z.object({
    title: z.string(),
    dek: z.string().optional(), // one-line subhead shown under the headline
    column: z.enum(['news', 'government-affairs', 'verified']),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('SRDG Intel Staff'),
    heroImage: z.string().optional(),
    verified: z.boolean().default(false),
    // Each entry becomes one Question/acceptedAnswer pair in the page's FAQPage JSON-LD
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { articles };
