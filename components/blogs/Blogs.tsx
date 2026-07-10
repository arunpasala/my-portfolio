"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Sparkles,
} from "lucide-react";

const upcomingTopics = [
  {
    title: "Next.js Development",
    description:
      "Modern Next.js patterns, performance improvements, routing, and deployment.",
    icon: Code2,
  },
  {
    title: "Full-Stack Engineering",
    description:
      "Frontend, backend, databases, authentication, APIs, and real projects.",
    icon: FileText,
  },
  {
    title: "Developer Journey",
    description:
      "Career lessons, interview preparation, learning strategies, and progress.",
    icon: BookOpen,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="relative overflow-hidden px-6 py-24 sm:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[5%] top-64 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* Section heading */}
        <motion.div
          variants={itemVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Sparkles className="h-4 w-4" />
            Blogs and technical writing
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ideas shaped through{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              code and experience
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            I am preparing practical articles about full-stack development,
            Next.js, user interfaces, software engineering, and lessons from
            building real-world projects.
          </p>
        </motion.div>

        {/* No blogs loading card */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-12"
        >
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10"
            >
              <BookOpen className="h-9 w-9 text-cyan-300" />

              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.45, 0, 0.45],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-3xl border border-cyan-300/30"
              />
            </motion.div>

            <h3 className="mt-8 text-3xl font-semibold text-white sm:text-4xl">
              First article is loading
            </h3>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              No articles have been published yet. I am currently working on
              useful technical content that explains what I build, how I solve
              problems, and what I learn along the way.
            </p>

            {/* Loading text */}
            <motion.div
              animate={{
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-8 flex items-center gap-2 text-sm font-medium text-cyan-300"
            >
              <span>Preparing content</span>

              <div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: dot * 0.15,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                  />
                ))}
              </div>
            </motion.div>

            {/* Animated progress bar */}
            <div className="mt-7 w-full max-w-md">
              <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>Writing</span>
                <span>Coming soon</span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{
                    x: ["-120%", "380%"],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming blog cards */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="mb-8 flex items-end gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                Coming soon
              </p>

              <h3 className="mt-3 text-3xl font-semibold text-white">
                Topics I plan to share
              </h3>
            </div>

            <div className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {upcomingTopics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <motion.article
                  key={topic.title}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/30 hover:bg-white/[0.065]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="mt-6 text-xl font-semibold text-white">
                    {topic.title}
                  </h4>

                  <p className="mt-3 leading-7 text-slate-400">
                    {topic.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-300">
                    Coming soon

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}