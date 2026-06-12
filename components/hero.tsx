import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.07] pt-16"
    >
      <div className="site-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[110px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[620px] max-w-5xl items-center px-5 py-20 sm:px-8">
        <Reveal>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-xs text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Open to software engineering internships
          </div>
          <p className="mb-4 text-sm font-medium text-violet-400">
            Full Stack Developer
          </p>
          <h1 className="text-balance max-w-3xl text-5xl font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Aviral Shukla
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-zinc-400 sm:text-xl">
            Building scalable web applications using React, Node.js and modern
            web technologies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projects">
                View Projects <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/aviral-shukla-resume.pdf" download>
                <Download className="size-4" /> Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a
                href="https://github.com/getchaviral"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <Github className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a
                href="https://www.linkedin.com/in/aviral-shukla-736a7622b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-8 text-xs text-zinc-600">Noida, India</p>
        </Reveal>
      </div>
    </section>
  );
}
