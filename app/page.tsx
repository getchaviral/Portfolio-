import { About, Skills } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ProjectExplorer } from "@/components/project-explorer";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

const sectionClass = "mx-auto max-w-5xl px-5 py-20 sm:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section id="about" className={sectionClass}>
          <SectionHeading eyebrow="About" title="A practical full-stack developer." />
          <About />
        </section>

        <section id="skills" className="border-y border-white/[0.07] bg-white/[0.012]">
          <div className={sectionClass}>
            <SectionHeading
              eyebrow="Skills"
              title="Technologies I work with."
            />
            <Skills />
          </div>
        </section>

        <section id="projects" className={sectionClass}>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work."
            description="Full-stack products built around practical workflows, secure access, and dependable backend systems."
          />
          <ProjectExplorer />
        </section>

        <section
          id="experience"
          className="border-t border-white/[0.07] bg-white/[0.012]"
        >
          <div className={sectionClass}>
            <SectionHeading
              eyebrow="Experience & Achievements"
              title="Learning through building."
            />
            <Experience />
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
