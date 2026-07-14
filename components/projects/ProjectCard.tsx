"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Layers3,
} from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  image?: string;
  live: string;
  code: string;
  index?: number;
};

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const projectNumber = String(
    project.index ?? 1,
  ).padStart(2, "0");

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative h-full"
    >
      {/* Soft animated gradient border */}
      <div className="project-card-gradient absolute -inset-[1px] rounded-[2rem] opacity-35 blur-[1px] transition-opacity duration-500 group-hover:opacity-80" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#090d18]/95 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        {/* Project image */}
        <div className="relative h-60 overflow-hidden border-b border-white/10 bg-[#0d1220]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-500">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
              >
                <Layers3 className="h-6 w-6" />
              </motion.div>

              <p className="mt-4 text-sm">
                Preview coming soon
              </p>
            </div>
          )}

          {/* Image overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-black/10" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.06]" />

          {/* Project number */}
          <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/75 backdrop-blur-xl">
            {projectNumber}
          </div>

          {/* Live preview overlay */}
          {project.live && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.04,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl"
              >
                View Live Demo
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            </div>
          )}
        </div>

        {/* Project information */}
        <div className="relative flex flex-1 flex-col p-6 sm:p-7">
          {/* Soft glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/10 opacity-40 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-cyan-300">
              {project.subtitle}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              {project.desc}
            </p>
          </div>

          {/* Technologies */}
          <div className="relative mt-6 flex flex-wrap gap-2">
            {project.tech.map((technology, index) => (
              <motion.span
                key={technology}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -3,
                }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/25 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                {technology}
              </motion.span>
            ))}
          </div>

          {/* Animated gradient divider */}
          <div className="relative mt-7 h-px overflow-hidden bg-white/10">
            <motion.div
              animate={{
                x: ["-100%", "220%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="relative mt-auto flex flex-wrap gap-3 pt-7">
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="group/button inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Live Demo

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </motion.a>
            )}

            {project.code && (
              <motion.a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-200"
              >
                <Code2 className="h-4 w-4 text-cyan-300" />
                Source Code
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom hover line */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.article>
  );
}