"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
            <span className="text-sm font-bold tracking-widest text-cyan-300">
              AP
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Bala Arun Pasala</p>
            <p className="text-xs text-slate-400">
              Developer • Designer • Builder
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Let’s Connect <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/90 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-300"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}