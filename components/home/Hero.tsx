"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  CalendarDays,
  Clock3,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers3,
  Mail,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
  User,
  X,
} from "lucide-react";

import SkeletonCard from "@/components/ui/SkeletonCard";

const rotatingRoles = [
  "Full-Stack Software Engineer",
  "Frontend Developer",
  "Backend Engineer",
  "React & Next.js Developer",
];

const focusAreas = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "React",
  "Next.js",
  "Java",
  "Spring Boot",
];

const engineeringStrengths = [
  {
    title: "Frontend",
    description:
      "Responsive interfaces, reusable components, animations, accessibility, and polished user experiences.",
    icon: MonitorSmartphone,
    accent: "text-cyan-300",
    background: "bg-cyan-400/10",
  },
  {
    title: "Backend",
    description:
      "REST APIs, microservices, authentication, databases, real-time systems, and scalable architecture.",
    icon: ServerCog,
    accent: "text-blue-300",
    background: "bg-blue-400/10",
  },
  {
    title: "Full-Stack",
    description:
      "Complete products connecting modern frontend interfaces with secure backend services and deployment workflows.",
    icon: Layers3,
    accent: "text-fuchsia-300",
    background: "bg-fuchsia-400/10",
  },
];

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] =
    useState<Date | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  const [
    showFloatingGreeting,
    setShowFloatingGreeting,
  ] = useState(false);

  const [activeRoleIndex, setActiveRoleIndex] =
    useState(0);

  const stats = useMemo(
    () => [
      {
        label: "Experience",
        value: "3.5+ Years",
      },
      {
        label: "Engineering Focus",
        value: "Full-Stack",
      },
      {
        label: "Core Strength",
        value: "Frontend + Backend",
      },
    ],
    [],
  );

  useEffect(() => {
    setCurrentDate(new Date());

    const clockTimer = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    const loadingTimer = window.setTimeout(() => {
      setLoading(false);
    }, 1200);

    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3800);

    const floatingTimer = window.setTimeout(() => {
      setShowFloatingGreeting(true);
    }, 4100);

    return () => {
      window.clearInterval(clockTimer);
      window.clearTimeout(loadingTimer);
      window.clearTimeout(introTimer);
      window.clearTimeout(floatingTimer);
    };
  }, []);

  useEffect(() => {
    const roleTimer = window.setInterval(() => {
      setActiveRoleIndex((current) => {
        return (current + 1) % rotatingRoles.length;
      });
    }, 2600);

    return () => {
      window.clearInterval(roleTimer);
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
          FULL-SCREEN INTRO
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
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6"
          >
            {/* Background glow */}

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

            {/* Grid */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

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
                Full-Stack Software Engineer building
                modern frontend experiences, scalable
                backend systems, secure APIs, and
                production-ready applications.
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

                  <span className="text-sm sm:text-base">
                    {formattedDate}
                  </span>
                </div>

                <div className="hidden h-5 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-cyan-300" />

                  <span className="font-medium tabular-nums text-white">
                    {formattedTime}
                  </span>
                </div>
              </motion.div>

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
          MAIN HERO
      ====================================================== */}

      <section
        id="home"
        className="relative mx-auto min-h-screen max-w-7xl overflow-hidden px-6 pb-20 pt-24 sm:pt-28"
      >
        {/* Background */}

        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]"
          />

          <motion.div
            animate={{
              x: [0, -45, 0],
              y: [0, -35, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[110px]"
          />

          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        {loading ? (
          <div className="grid min-h-[75vh] gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <SkeletonCard className="min-h-[30rem]" />
            <SkeletonCard className="min-h-[30rem]" />
          </div>
        ) : (
          <div className="grid min-h-[75vh] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

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
              className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                Open to Software Engineering Roles
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Building complete digital products
                from{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  polished frontend to scalable
                  backend.
                </span>
              </h1>

              {/* Rotating role */}

              <div className="mt-6 flex min-h-10 items-center gap-3">
                <Code2 className="h-5 w-5 shrink-0 text-cyan-300" />

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeRoleIndex}
                    initial={{
                      opacity: 0,
                      y: 15,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                      filter: "blur(5px)",
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="text-base font-semibold text-cyan-200 sm:text-lg"
                  >
                    {rotatingRoles[activeRoleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I&apos;m Arun, a Full-Stack Software
                Engineer specializing in responsive
                frontend development, reusable React
                components, Next.js applications, scalable
                Java and Node.js backend systems, REST
                APIs, databases, authentication, and
                cloud-ready products.
              </p>

              {/* CTA buttons */}

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition"
                >
                  Explore Projects

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                
                <motion.a
                  href="#contact"
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/25 hover:bg-cyan-400/10"
                >
                  Let&apos;s Connect

                  <Mail className="h-4 w-4" />
                </motion.a>

                <motion.a
                  href="/resume/Bala-Arun-Pasala-Resume.pdf"
                  download="Bala-Arun-Pasala-Resume.pdf"
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  Download Resume

                  <Download className="h-4 w-4" />
                </motion.a>
              </div>

              {/* Stats */}

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.15 + index * 0.12,
                      duration: 0.5,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-cyan-400/20"
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

            {/* =================================================
                RIGHT PREVIEW
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.15,
              }}
              className="relative"
            >
              <div className="pointer-events-none absolute -left-8 top-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />

              <div className="pointer-events-none absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-fuchsia-400/15 blur-3xl" />

              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 1.5,
                  rotateY: -1.5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111827]/80 p-6 shadow-2xl backdrop-blur-2xl"
                style={{
                  transformPerspective: 1200,
                }}
              >
                {/* No glare overlay */}

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Engineering Profile
                    </p>

                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Frontend + Backend Expertise
                    </h3>
                  </div>

                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3"
                  >
                    <Briefcase className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {/* Focus areas */}

                  <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Focus Areas
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {focusAreas.map((item, index) => (
                        <motion.span
                          key={item}
                          initial={{
                            opacity: 0,
                            scale: 0.85,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            delay: 0.25 + index * 0.06,
                          }}
                          whileHover={{
                            y: -3,
                            scale: 1.04,
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-400/25 hover:text-cyan-200"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Frontend / backend / full-stack */}

                  <div className="grid gap-3">
                    {engineeringStrengths.map(
                      (strength, index) => {
                        const Icon = strength.icon;

                        return (
                          <motion.div
                            key={strength.title}
                            initial={{
                              opacity: 0,
                              x: 20,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: 0.35 + index * 0.12,
                            }}
                            whileHover={{
                              x: 5,
                            }}
                            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                          >
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 ${strength.background}`}
                            >
                              <Icon
                                className={`h-5 w-5 ${strength.accent}`}
                              />
                            </div>

                            <div>
                              <p className="font-semibold text-white">
                                {strength.title}
                              </p>

                              <p className="mt-1 text-sm leading-6 text-slate-400">
                                {strength.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      },
                    )}
                  </div>

                  {/* Role + education */}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <User className="h-5 w-5 text-cyan-300" />

                      <p className="mt-4 text-sm text-slate-400">
                        Role Target
                      </p>

                      <p className="mt-1 text-lg font-semibold text-white">
                        Software Engineer
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <GraduationCap className="h-5 w-5 text-fuchsia-300" />

                      <p className="mt-4 text-sm text-slate-400">
                        Education
                      </p>

                      <p className="mt-1 text-lg font-semibold text-white">
                        MS Computer Science
                      </p>
                    </motion.div>
                  </div>

                  {/* Intro */}

                  <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-blue-500/[0.06] to-transparent p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Database className="h-4 w-4 text-cyan-300" />

                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                        End-to-end engineering
                      </p>
                    </div>

                    <p className="text-sm leading-7 text-slate-300">
                      I build scalable full-stack
                      applications combining responsive
                      frontend interfaces, robust backend
                      architecture, secure APIs, optimized
                      databases, and seamless user
                      experiences.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Scroll indicator */}

        {!loading && (
          <motion.a
            href="#profile"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 lg:flex"
          >
            Discover More

            <motion.span
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-4 w-4 text-cyan-300" />
            </motion.span>
          </motion.a>
        )}
      </section>

      {/* =====================================================
          FLOATING GREETING
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
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#111827]/80 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-[30px] transition-all duration-300 hover:border-white/20"
            >
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
                    type="button"
                    onClick={() =>
                      setShowFloatingGreeting(false)
                    }
                    aria-label="Close greeting"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 text-cyan-300" />

                    <span className="tabular-nums">
                      {formattedTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-fuchsia-300" />

                    <span>
                      {currentDate?.toLocaleDateString(
                        [],
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}
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