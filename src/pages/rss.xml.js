import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const analyses = (await getCollection('analysis'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: analyses.map((post) => ({
      title: `Blackwood Analysis ${post.data.number}: ${post.data.title}`,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/analysis/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
