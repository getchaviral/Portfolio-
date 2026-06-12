import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const contacts = [
  {
    label: "Email",
    value: "shuklaaviral403@gmail.com",
    href: "mailto:shuklaaviral403@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "aviral-shukla",
    href: "https://www.linkedin.com/in/aviral-shukla-736a7622b/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "getchaviral",
    href: "https://github.com/getchaviral",
    icon: Github,
  },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              Open to software engineering and full-stack development internship
              opportunities.
            </p>
          </div>
          <div className="grid gap-2">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="focus-ring group flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4 shrink-0 text-zinc-500" />
                  <span>
                    <span className="block text-xs text-zinc-600">{label}</span>
                    <span className="block truncate text-sm text-zinc-300">
                      {value}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-zinc-700 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="border-t border-white/[0.07] py-6 text-center text-xs text-zinc-700">
        Aviral Shukla · Full Stack Developer
      </footer>
    </section>
  );
}
