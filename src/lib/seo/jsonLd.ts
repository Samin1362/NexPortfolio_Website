import { siteConfig } from "@/lib/site";

type ImageObject = { url: string; width?: number; height?: number };

type ProjectSchemaInput = {
  title: string;
  description?: string | null;
  url?: string;
  image?: string | null;
  techStack?: string[] | null;
  datePublished?: string;
};

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.shortBio,
    email: siteConfig.email,
    sameAs: siteConfig.socials
      .filter((s) => !s.href.startsWith("mailto:"))
      .map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortBio,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function projectSchema(project: ProjectSchemaInput) {
  const image: ImageObject | undefined = project.image
    ? { url: project.image, width: 1200, height: 630 }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description ?? undefined,
    url: project.url,
    image: image?.url,
    datePublished: project.datePublished,
    keywords: project.techStack?.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function jsonLdScriptProps<T>(data: T) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
