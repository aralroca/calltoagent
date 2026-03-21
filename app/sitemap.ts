import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const enPosts = await getSortedPostsData("en");
  const esPosts = await getSortedPostsData("es");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://calltoagent.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://calltoagent.com/en",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://calltoagent.com/es",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://calltoagent.com/en/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://calltoagent.com/es/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = [
    ...enPosts.map((post) => ({
      url: `https://calltoagent.com/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...esPosts.map((post) => ({
      url: `https://calltoagent.com/es/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...blogRoutes];
}
