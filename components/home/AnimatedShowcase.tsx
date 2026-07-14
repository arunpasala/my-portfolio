"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Code2,
  Globe2,
  Rocket,
  Sparkles,
} from "lucide-react";

import RotatingGlobe from "./RotatingGlobe";
import TechStack from "./TechStack";

const cards = [
  {
    label: "LET’S BUILD TOGETHER",
    title: "Clear communication, fast iterations, and no surprises.",
    description:
      "I turn ideas into production-ready products through transparent communication, thoughtful planning, and consistent delivery.",
    icon: Sparkles,
  },
  {
    label: "TECH STACK",
    title: "Modern technologies behind everything I build.",
    description:
      "I use reliable frontend, backend, database, and cloud technologies to create scalable and maintainable applications.",
    icon: Code2,
  },
  {
    label: "FLEXIBLE WITH TIME ZONES",
    title: "Based in the USA and available for global collaboration.",
    description:
      "I work comfortably with distributed teams and maintain clear communication across different locations and schedules.",
    icon: Globe2,
  },
  {
    label: "WHAT YOU GET",
    title: "Clean code, polished interfaces, and scalable delivery.",
    description:
      "Every project is built with performance, accessibility, security, responsiveness, and long-term maintainability in mind.",
    icon: Rocket,
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function AnimatedShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-[5%] h-80 w-80 rounded-full bg-violet-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            How I work
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Building products with{" "}
            <span className="showcase-gradient-text">
              clarity, quality, and purpose.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            I combine modern engineering practices, thoughtful user experience,
            and reliable communication to deliver products that are polished,
            scalable, and ready for real-world use.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.label}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-[0_25px_70px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-400/25 hover:bg-white/[0.05] sm:p-8"
              >
                {/* Moving shine */}
                <motion.div
                  animate={{
                    x: ["-160%", "280%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 1.5 + index,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
                />

                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 opacity-30 blur-[100px] transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                        {card.label}
                      </p>

                      <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-white">
                        {card.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                    {card.description}
                  </p>

                  {/* Card-specific content */}
                  {index === 0 && (
                    <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                      <RotatingGlobe />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                      <TechStack />
                    </div>
                  )}

                  {index === 2 && (
                    <div className="relative mt-8 min-h-52 overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-6">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]" />

                      <motion.div
                        animate={{
                          x: ["-10%", "85%", "-10%"],
                          y: [10, 90, 10],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute left-4 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                      >
                        <Globe2 className="h-5 w-5" />
                      </motion.div>

                      <div className="relative grid min-h-40 place-items-center text-center">
                        <div>
                          <Clock3 className="mx-auto h-8 w-8 text-cyan-300" />

                          <p className="mt-4 font-semibold text-white">
                            Flexible collaboration
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Available across US, European, and Asian time zones.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-5 sm:grid-cols-2">
                      {[
                        "Responsive UI",
                        "Scalable architecture",
                        "Secure APIs",
                        "Production deployment",
                      ].map((item, itemIndex) => (
                        <motion.div
                          key={item}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay: itemIndex * 0.1,
                            duration: 0.45,
                          }}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}