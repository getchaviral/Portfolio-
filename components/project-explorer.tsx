import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function ProjectExplorer() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 0.05}>
          <article className="panel flex h-full flex-col rounded-xl p-6 transition-colors hover:border-white/[0.16]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-violet-400">
                0{index + 1}
              </span>
              <span className="size-1.5 rounded-full bg-emerald-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
              {project.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-zinc-500"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-7 flex gap-2 border-t border-white/[0.07] pt-5">
              <Button asChild size="sm">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={project.repoUrl} target="_blank" rel="noreferrer">
                  <Github className="size-3.5" /> GitHub
                </a>
              </Button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
