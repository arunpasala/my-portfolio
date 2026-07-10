"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Clock3,
  Download,
  GraduationCap,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showFloatingGreeting, setShowFloatingGreeting] = useState(false);

  const stats = useMemo(
    () => [
      {
        label: "Projects Built",
        value: "5+",
      },
      {
        label: "Core Stack",
        value: "Software Engineering",
      },
      {
        label: "Focus",
        value: "Full-Stack",
      },
    ],
    []
  );

  useEffect(() => {
    setCurrentDate(new Date());

    const clockTimer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Keep the full-screen greeting visible.
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3800);

    // Show the small bottom-right greeting after the intro disappears.
    const floatingTimer = setTimeout(() => {
      setShowFloatingGreeting(true);
    }, 4100);

    return () => {
      clearInterval(clockTimer);
      clearTimeout(loadingTimer);
      clearTimeout(introTimer);
      clearTimeout(floatingTimer);
    };
  }, []);

  const greeting = useMemo(() => {
    if (!currentDate) {
      return "Welcome";
    }

    const hour = currentDate.getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 17) {
      return "Good Afternoon";
    }

    return "Good Evening";
  }, [currentDate]);

  const formattedTime =
    currentDate?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }) ?? "";

  const formattedDate =
    currentDate?.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? "";

  return (
    <>
      {/* =====================================================
          FULL-SCREEN GREETING INTRO
      ====================================================== */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(10px)",
            }}
            transition={{
              exit: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6"
          >
            {/* Background glows */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
              }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[140px]" />

              <div className="absolute -right-24 bottom-10 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-[150px]" />

              <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
            </motion.div>

            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Intro content */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 w-full max-w-4xl text-center"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 text-5xl shadow-[0_0_70px_rgba(34,211,238,0.25)] backdrop-blur-2xl sm:h-28 sm:w-28 sm:text-6xl"
              >
                👋
              </motion.div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                }}
                className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300 sm:text-base"
              >
                {greeting}
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
                className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Bala Arun Pasala
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.7,
                }}
                className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
              >
                Thanks for visiting my portfolio. Explore my work, experience,
                skills, and the products I enjoy building.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.9,
                }}
                className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-4 text-slate-300 sm:flex-row sm:gap-8"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-fuchsia-300" />

                  <span className="text-sm sm:text-base">{formattedDate}</span>
                </div>

                <div className="hidden h-5 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-cyan-300" />

                  <span className="font-medium tabular-nums text-white">
                    {formattedTime}
                  </span>
                </div>
              </motion.div>

              {/* Loading progress */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                }}
                className="mx-auto mt-12 max-w-sm"
              >
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 3.2,
                      ease: "linear",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400"
                  />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                  <motion.span
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                  />

                  Loading Portfolio
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MAIN HERO SECTION
      ====================================================== */}
      <section
        id="home"
        className="relative mx-auto min-h-screen max-w-7xl overflow-hidden px-6 pb-20 pt-24 sm:pt-28"
      >
        {/* Hero background effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[110px]" />

          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        {loading ? (
          <div className="grid min-h-[75vh] gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <SkeletonCard className="min-h-[30rem]" />
            <SkeletonCard className="min-h-[30rem]" />
          </div>
        ) : (
          <div className="grid min-h-[75vh] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left hero content */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Available for Full-Stack Roles
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Building modern digital products with
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {" "}
                  clean code and premium design.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I&apos;m Arun, a developer focused on Next.js, full-stack
                systems, UI/UX, and product-driven web experiences that look
                professional and perform well.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-[1.03]"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10"
                >
                  Hire Me
                  <Mail className="h-4 w-4" />
                </a>

                <a
                  href="/Bala-Arun-Pasala-Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition duration-300 hover:bg-cyan-400/20"
                >
                  Download Resume
                  <Download className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.15 + index * 0.12,
                      duration: 0.5,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <p className="break-words text-lg font-semibold text-white sm:text-xl">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right portfolio preview */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative"
            >
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />

              <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Portfolio Preview
                    </p>

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
                      {["Full-Stack", "Frontend", "UI/UX", "Next.js"].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <User className="h-5 w-5 text-cyan-300" />

                      <p className="mt-4 text-sm text-slate-400">
                        Role Target
                      </p>

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
                    <p className="text-sm leading-7 text-slate-300">
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

      {/* =====================================================
    SMALL FLOATING GREETING
====================================================== */}
<AnimatePresence>
  {showFloatingGreeting && (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
        y: 40,
        x: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        y: 20,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-[290px] sm:bottom-6 sm:right-6"
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -4,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/15
          bg-white/[0.04]
          backdrop-blur-[30px]
          shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          p-4
          transition-all
          duration-300
          hover:bg-white/[0.06]
          hover:border-white/20
        "
      >
        {/* Glass highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent" />

        {/* Soft border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-lg">
                👋
              </div>

              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  {greeting}
                </p>

                <h3 className="mt-0.5 text-sm font-semibold text-white">
                  Hi from Bala Arun Pasala
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Thanks for visiting my portfolio.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFloatingGreeting(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
              <span className="tabular-nums">{formattedTime}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-fuchsia-300" />
              <span>
                {currentDate?.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}   