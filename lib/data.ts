export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
};

export const projects: Project[] = [
  {
    slug: "bloodbond",
    name: "BloodBond",
    description:
      "A full-stack blood donation platform with donor matching, secure authentication, role-based access, and Redis-powered caching.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "OAuth"],
    liveUrl: "https://bloodbond-platform.vercel.app/",
    repoUrl: "https://github.com/getchaviral",
  },
  {
    slug: "reservify",
    name: "Reservify",
    description:
      "A reservation platform with booking management, JWT authentication, Razorpay payments, and an administrative dashboard.",
    tech: ["React.js", "Node.js", "MongoDB", "JWT", "Razorpay"],
    liveUrl: "https://smart-reservation-system.vercel.app/",
    repoUrl: "https://github.com/getchaviral",
  },
  {
    slug: "muggam",
    name: "MUGGAM",
    description:
      "A responsive text-to-video workflow using FFmpeg for media processing, with Google OAuth and a clean creator experience.",
    tech: ["React.js", "FFmpeg", "Google OAuth"],
    liveUrl: "https://muggam.vercel.app/",
    repoUrl: "https://github.com/getchaviral",
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    description: "Interfaces that stay clear under real product complexity.",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    description: "Secure APIs, authentication, and service-oriented workflows.",
    skills: ["Node.js", "Express.js", "REST APIs", "OAuth 2.0", "JWT"],
  },
  {
    label: "Data",
    description: "Storage and caching selected around access patterns.",
    skills: ["MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Foundations",
    description: "The concepts beneath reliable software systems.",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];
