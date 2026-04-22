import { Hero } from "@/components/home/Hero";
import { TechBar } from "@/components/home/TechBar";
import { SkillsSection } from "@/components/home/SkillsSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { EducationSection } from "@/components/home/EducationSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { listProjectsSafe } from "@/lib/api/projects";

export const revalidate = 3600;

export default async function HomePage() {
  const { projects } = await listProjectsSafe({ revalidate: 3600 });

  return (
    <>
      <Hero />
      <TechBar />
      <SkillsSection />
      <FeaturedProjects projects={projects} />
      <EducationSection />
      <ContactCTA />
    </>
  );
}
