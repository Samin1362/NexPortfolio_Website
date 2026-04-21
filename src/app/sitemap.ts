import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { listProjects } from "@/lib/api/projects";
import { buildProjectSlug } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await listProjects({ revalidate: 3600 });
    projectRoutes = projects.map((p) => ({
      url: `${siteConfig.url}/projects/${buildProjectSlug(p.title, p.id)}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.warn("sitemap: failed to fetch projects — continuing with static routes only", error);
  }

  return [...staticRoutes, ...projectRoutes];
}
