"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers3,
  WandSparkles,
} from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive, high-performance interfaces with React, Next.js, and Tailwind CSS.",
    icon: Code2,
    accent: "cyan",
  },
  {
    title: "Full-Stack Web Apps",
    description:
      "Scalable applications with clean architecture, API integration, authentication, and database support.",
    icon: Layers3,
    accent: "blue",
  },
  {
    title: "UI/UX Prototyping",
    description:
      "Professional product-focused layouts, wireframes, interactive sections, and polished portfolio experiences.",
    icon: WandSparkles,
    accent: "purple",
  },
];

const accentStyles = {
  cyan: {
    icon: "text-cyan-300",
    iconBg: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/30",
    glow: "bg-cyan-500/10",
  },
  blue: {
    icon: "text-blue-300",
    iconBg: "bg-blue-400/10",
    border: "group-hover:border-blue-400/30",
    glow: "bg-blue-500/10",
  },
  purple: {
    icon: "text-purple-300",
    iconBg: "bg-purple-400/10",
    border: "group-hover:border-purple-400/30",
    glow: "bg-purple-500/10",
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050611] px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.header
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
            Services
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            What I can help{" "}
            <span className="services-gradient-text">
              build and improve.
            </span>
          </h2>
        </motion.header>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const styles =
              accentStyles[
                service.accent as keyof typeof accentStyles
              ];

            return (
              <motion.article
                key={service.title}
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
                  amount: 0.25,
                }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.015,
                }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl transition-colors duration-300 ${styles.border}`}
              >
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 ${styles.iconBg}`}
                >
                  <Icon
                    className={`h-6 w-6 ${styles.icon}`}
                  />

                  <motion.span
                    animate={{
                      scale: [1, 1.35, 1],
                      opacity: [0.35, 0, 0.35],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-2xl border border-white/15"
                  />
                </motion.div>

                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl transition-opacity duration-500 ${styles.glow} opacity-30 group-hover:opacity-80`}
                />

                <h3 className="relative mt-8 text-2xl font-semibold">
                  {service.title}
                </h3>

                <p className="relative mt-5 leading-8 text-slate-400">
                  {service.description}
                </p>

                <motion.div
                  initial={{
                    scaleX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.35 + index * 0.12,
                    duration: 0.7,
                  }}
                  className="mt-8 h-px origin-left bg-gradient-to-r from-white/20 to-transparent"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}