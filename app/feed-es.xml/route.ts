import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const posts = await getSortedPostsData("es");

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://calltoagent.com/es/blog/${post.slug}</link>
      <guid isPermaLink="true">https://calltoagent.com/es/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <author>${post.author}</author>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de CallToAgent</title>
    <link>https://calltoagent.com/es/blog</link>
    <description>Artículos sobre agentes de voz con IA, MCP, y automatización de atención al cliente.</description>
    <language>es</language>
    <atom:link href="https://calltoagent.com/feed-es.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
