import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const posts = await getSortedPostsData("en");

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://calltoagent.com/en/blog/${post.slug}</link>
      <guid isPermaLink="true">https://calltoagent.com/en/blog/${post.slug}</guid>
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
    <title>CallToAgent Blog</title>
    <link>https://calltoagent.com/en/blog</link>
    <description>Articles about AI voice agents, MCP, and customer service automation.</description>
    <language>en</language>
    <atom:link href="https://calltoagent.com/feed.xml" rel="self" type="application/rss+xml"/>
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
