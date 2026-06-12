import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <Reveal>
      <div className="panel rounded-xl p-6 sm:p-8">
        <p className="max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
          I&apos;m a final-year Computer Science student and full-stack developer
          focused on building reliable, user-friendly web applications. I work
          across React interfaces, Node.js APIs, authentication, databases, and
          caching. I enjoy turning practical problems into clean, maintainable
          software.
        </p>
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, index) => (
        <Reveal key={group.label} delay={index * 0.03}>
          <div className="panel h-full rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white">{group.label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-xs text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
