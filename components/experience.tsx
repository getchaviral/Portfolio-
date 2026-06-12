import { BriefcaseBusiness, Code2, Trophy } from "lucide-react";
import { Reveal } from "@/components/reveal";

const evidence = [
  {
    icon: BriefcaseBusiness,
    value: "Frontend Developer Intern",
    label: "Professional Experience",
  },
  {
    icon: Code2,
    value: "300+",
    label: "DSA Problems Solved",
  },
  {
    icon: Trophy,
    value: "Top 30",
    label: "Among 200+ Build With Delhi teams",
  },
];

export function Experience() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {evidence.map(({ icon: Icon, value, label }, index) => (
        <Reveal key={label} delay={index * 0.04}>
          <div className="panel h-full rounded-xl p-6">
            <Icon className="size-5 text-violet-400" aria-hidden="true" />
            <p className="mt-8 text-xl font-semibold tracking-tight text-white">
              {value}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
