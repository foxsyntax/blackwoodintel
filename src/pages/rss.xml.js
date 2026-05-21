import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context) {
  const analyses = await getCollection('analysis');
  const anatomyCases = await getCollection('anatomy');

  const analysisItems = analyses.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    link: `/analysis/${post.id}/`,
  }));

  const anatomyItems = anatomyCases.map((c) => ({
    title: c.data.title,
    description: c.data.lede,
    pubDate: c.data.pubDate,
    link: `/anatomy/${c.id}/`,
  }));

  const items = [...analysisItems, ...anatomyItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'Blackwood Intelligence',
    description: SITE_DESCRIPTION,
    site: context.site ?? SITE_URL,
    items,
    customData: `<language>en-us</language>`,
  });
}
