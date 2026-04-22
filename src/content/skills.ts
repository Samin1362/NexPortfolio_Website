export type SkillItem = { name: string; accent?: string };
export type SkillGroup = {
  category: string;
  description: string;
  skills: SkillItem[];
};

export const skillsData: SkillGroup[] = [
  {
    category: "Frontend",
    description: "UI engineering, component systems, and modern React.",
    skills: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "React Router" },
      { name: "Responsive UI/UX" },
    ],
  },
  {
    category: "Backend",
    description: "APIs, data modeling, and auth for full-stack apps.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "REST APIs" },
      { name: "Firebase Auth" },
      { name: "JWT" },
    ],
  },
  {
    category: "AI & Tooling",
    description: "Day-to-day dev experience and ML experiments.",
    skills: [
      { name: "Cursor" },
      { name: "Claude Code" },
      { name: "Python" },
      { name: "TensorFlow" },
    ],
  },
  {
    category: "Version Control & Deployment",
    description: "Shipping to production and keeping it running.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "Render" },
    ],
  },
];
