"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Download,
  GraduationCap,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Hero() {
  const [loading, setLoading] = useState(true);

  const stats = useMemo(
    () => [
      { label: "Projects Built", value: "5+" },
      { label: "Core Stack", value: "Software-engineering" },
      { label: "Focus", value: "Full-Stack" },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:pt-20">
      {loading ? (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <SkeletonCard className="min-h-[24rem]" />
          <SkeletonCard className="min-h-[24rem]" />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" /> Available for Full-Stack Roles
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Building modern digital products with
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                {" "}
                clean code and premium design.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I’m Arun, a developer focused on Next.js, full-stack systems,
              UI/UX, and product-driven web experiences that look professional
              and perform well.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>

              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                Hire Me <Mail className="h-4 w-4" />
              </a>

              <a href="#" className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
                Download Resume <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Portfolio Preview</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Professional Presence
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <Briefcase className="h-5 w-5 text-cyan-300" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Focus Areas
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Full-Stack", "Frontend", "UI/UX", "Next.js"].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <User className="h-5 w-5 text-cyan-300" />
                    <p className="mt-4 text-sm text-slate-400">Role Target</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Software Engineer
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <GraduationCap className="h-5 w-5 text-fuchsia-300" />
                    <p className="mt-4 text-sm text-slate-400">Education</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      MS Computer Science
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 p-5">
                  <p className="text-sm text-slate-300">
                    A strong portfolio should show your value clearly, guide
                    recruiters quickly, and make your work memorable.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}