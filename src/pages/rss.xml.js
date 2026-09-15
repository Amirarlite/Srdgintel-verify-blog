import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  return rss({
    title: 'SRDG Intel',
    description: 'Verified news and government affairs reporting.',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.dek,
      pubDate: article.data.pubDate,
      link: `/articles/${article.slug}/`,
    })),
  });
}
