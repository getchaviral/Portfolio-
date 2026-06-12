"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-background/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <a href="#top" className="focus-ring flex items-center gap-2 rounded-md">
          <span className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-xs font-semibold text-white">
            AS
          </span>
          <span className="text-sm font-medium text-zinc-200">Aviral Shukla</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm text-zinc-500 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Contact</a>
          </Button>
          <button
            className="focus-ring rounded-md p-2 text-zinc-400 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-background px-5 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-zinc-300 hover:bg-white/[0.05]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-3 text-sm text-violet-400"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
