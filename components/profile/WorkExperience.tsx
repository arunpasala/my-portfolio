"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Code2,
  Database,
  MapPin,
  ServerCog,
  Sparkles,
  Zap,
} from "lucide-react";

type Experience = {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
  accent: "cyan" | "violet";
  metrics: {
    value: string;
    label: string;
  }[];
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "ScalaCode",
    position: "Software Engineer Associate",
    location: "USA",
    period: "June 2025 – Present",
    current: true,
    accent: "cyan",
    description:
      "Developing scalable backend systems, AI-powered workflows, and real-time SaaS applications across backend, frontend, cloud, and DevOps environments.",
    achievements: [
      "Developed scalable microservices and RESTful APIs using Node.js, Express, and Spring Boot.",
      "Built real-time event-driven systems using WebSockets and asynchronous messaging.",
      "Processed more than 10,000 events per day while reducing dashboard update delays.",
      "Optimized MongoDB and SQL queries across datasets exceeding one million records.",
      "Integrated route optimization, predictive maintenance, and computer-vision workflows.",
      "Built file-ingestion pipelines supporting files up to 100 MB.",
      "Developed responsive React dashboards using React Hooks and Tailwind CSS.",
      "Contributed to AWS and Azure deployments, Docker, CI/CD, monitoring, and Agile delivery.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "React",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Azure",
      "WebSockets",
      "REST APIs",
      "Tailwind CSS",
    ],
    metrics: [
      {
        value: "10K+",
        label: "Events daily",
      },
      {
        value: "40%",
        label: "Faster queries",
      },
      {
        value: "1M+",
        label: "Records handled",
      },
    ],
  },
  {
    id: 2,
    company: "Verily",
    position: "Software Engineer",
    location: "India",
    period: "January 2022 – July 2024",
    accent: "violet",
    description:
      "Built secure healthcare backend systems focused on interoperability, workflow automation, API integrations, and healthcare data processing using Java and Spring Boot.",
    achievements: [
      "Built scalable backend applications and distributed services using Java and Spring Boot.",
      "Designed REST APIs for healthcare interoperability, patient-data exchange, and claims workflows.",
      "Implemented HL7 v2, FHIR, JSON, and XML transformation pipelines.",
      "Reduced manual processing effort through automated healthcare-data workflows.",
      "Designed PostgreSQL, MySQL, and MongoDB data models for clinical and claims data.",
      "Implemented OAuth 2.0 and JWT authentication for sensitive healthcare systems.",
      "Improved system reliability through testing, debugging, and production issue resolution.",
      "Worked in Agile environments using Git, Jira, Docker, Jenkins, and GitHub Actions.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "HL7",
      "FHIR",
      "OAuth 2.0",
      "JWT",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Jenkins",
      "Postman",
    ],
    metrics: [
      {
        value: "60%",
        label: "Processing gain",
      },
      {
        value: "40%",
        label: "Less manual work",
      },
      {
        value: "35%",
        label: "Higher reliability",
      },
    ],
  },
];

const accentStyles = {
  cyan: {
    border: "group-hover:border-cyan-400/35",
    glow: "bg-cyan-500/15",
    icon: "text-cyan-300",
    badge:
      "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    dot: "bg-cyan-400",
    line: "from-cyan-400 via-blue-500 to-violet-500",
    metric:
      "border-cyan-400/15 bg-cyan-400/[0.055]",
  },
  violet: {
    border: "group-hover:border-violet-400/35",
    glow: "bg-violet-500/15",
    icon: "text-violet-300",
    badge:
      "border-violet-400/20 bg-violet-400/10 text-violet-200",
    dot: "bg-violet-400",
    line: "from-violet-400 via-fuchsia-500 to-cyan-400",
    metric:
      "border-violet-400/15 bg-violet-400/[0.055]",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.35,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -120,
    rotateX: -12,
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      type: "spring" as const,
      stiffness: 85,
      damping: 16,
      mass: 0.9,
    },
  },
};

export default function WorkExperience() {
  const [expandedId, setExpandedId] = useState<number>(1);

  return (
    <motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{
    once: true,
    amount: 0.15,
  }}
  className="relative"
>
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-2xl sm:p-9"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              x: ["-100%", "220%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-cyan-300/[0.055] to-transparent"
          />

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />

          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-[110px]" />
        </div>

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
              >
                <BriefcaseBusiness className="h-6 w-6" />

                <motion.span
                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.35, 0, 0.35],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-2xl border border-cyan-300/25"
                />
              </motion.div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                  Professional journey
                </p>

                <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Work{" "}
                  <span className="work-gradient-text font-serif italic">
                    Experience
                  </span>
                </h3>
              </div>
            </div>

            <p className="mt-6 max-w-3xl leading-8 text-slate-400">
              Building scalable backend systems, real-time
              applications, secure APIs, healthcare integrations,
              AI-powered workflows, and cloud-ready products.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SummaryMetric value="3.5+" label="Years" />
            <SummaryMetric value="2" label="Companies" />
            <SummaryMetric value="Full" label="Stack" />
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute bottom-8 left-[27px] top-6 hidden w-px overflow-hidden bg-white/10 sm:block">
          <motion.div
            initial={{
              scaleY: 0,
            }}
            animate={{
              scaleY: 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full origin-top bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500"
          />
        </div>

        <div className="grid gap-8">
          {experiences.map((experience, index) => {
            const expanded =
              expandedId === experience.id;

            const styles =
              accentStyles[experience.accent];

            return (
              <motion.article
  key={experience.id}
  variants={cardVariants}
  whileHover={{
    y: -8,
    scale: 1.008,
  }}
  className="group relative sm:pl-24"
  style={{
    transformPerspective: 1200,
  }}
>
                {/* Timeline node */}
                <motion.button
  type="button"
  onClick={() =>
    setExpandedId(
      expanded ? 0 : experience.id
    )
  }
  initial={{
    opacity: 0,
    scale: 0,
    y: -50,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  transition={{
    delay: 0.45 + index * 0.35,
    duration: 0.6,
    type: "spring",
    stiffness: 140,
    damping: 14,
  }}
  whileHover={{
    scale: 1.1,
    rotate: 4,
  }}
  whileTap={{
    scale: 0.92,
  }}
  className="absolute left-0 top-8 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-[#07111f] text-sm font-bold text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)] sm:flex"
>
  {String(index + 1).padStart(2, "0")}
</motion.button>

                {/* Card */}
                <motion.div
                  layout
                  whileHover={{
                    y: -8,
                    scale: 1.008,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-colors duration-300 sm:p-8 ${styles.border}`}
                >
                  {/* Animated shine */}
                  <motion.div
                    animate={{
                      x: ["-130%", "260%"],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      repeatDelay: 1.5 + index,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
                  />

                  <div
                    className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px] transition-opacity duration-500 ${styles.glow} opacity-35 group-hover:opacity-80`}
                  />

                  <div className="relative">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <motion.div
                            animate={{
                              rotate:
                                experience.current
                                  ? [0, 4, -4, 0]
                                  : 0,
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${styles.icon}`}
                          >
                            {experience.accent === "cyan" ? (
                              <ServerCog className="h-5 w-5" />
                            ) : (
                              <Database className="h-5 w-5" />
                            )}
                          </motion.div>

                          <div>
                            <h4 className="text-xl font-semibold text-white sm:text-2xl">
                              {experience.position}
                            </h4>

                            <p
                              className={`mt-1 font-medium ${styles.icon}`}
                            >
                              {experience.company}
                            </p>
                          </div>

                          {experience.current && (
                            <motion.span
                              animate={{
                                boxShadow: [
                                  "0 0 0 rgba(52,211,153,0)",
                                  "0 0 26px rgba(52,211,153,0.22)",
                                  "0 0 0 rgba(52,211,153,0)",
                                ],
                              }}
                              transition={{
                                duration: 2.4,
                                repeat: Infinity,
                              }}
                              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                            >
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                              </span>

                              Current
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-sm text-slate-400 lg:items-end">
                        <motion.span
                          whileHover={{
                            x: -4,
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          <CalendarDays className={`h-4 w-4 ${styles.icon}`} />
                          {experience.period}
                        </motion.span>

                        <motion.span
                          whileHover={{
                            x: -4,
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          <MapPin className={`h-4 w-4 ${styles.icon}`} />
                          {experience.location}
                        </motion.span>
                      </div>
                    </div>

                    <p className="mt-6 max-w-4xl leading-8 text-slate-300">
                      {experience.description}
                    </p>

                    {/* Metrics */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {experience.metrics.map(
                        (metric, metricIndex) => (
                          <motion.div
                            key={metric.label}
                            initial={{
                              opacity: 0,
                              y: 15,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay:
                                0.25 +
                                metricIndex * 0.1,
                            }}
                            whileHover={{
                              y: -4,
                              scale: 1.02,
                            }}
                            className={`rounded-2xl border p-4 ${styles.metric}`}
                          >
                            <p
                              className={`text-2xl font-bold ${styles.icon}`}
                            >
                              {metric.value}
                            </p>

                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                              {metric.label}
                            </p>
                          </motion.div>
                        )
                      )}
                    </div>

                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(
                          expanded
                            ? 0
                            : experience.id
                        )
                      }
                      className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      {expanded
                        ? "Hide details"
                        : "View achievements"}

                      <motion.span
                        animate={{
                          rotate: expanded ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            marginTop: 28,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 pt-7">
                            <div className="grid gap-4">
                              {experience.achievements.map(
                                (
                                  achievement,
                                  achievementIndex
                                ) => (
                                  <motion.div
                                    key={achievement}
                                    initial={{
                                      opacity: 0,
                                      x: -18,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      delay:
                                        achievementIndex *
                                        0.06,
                                    }}
                                    className="flex items-start gap-3 text-sm leading-7 text-slate-400 sm:text-base"
                                  >
                                    <motion.span
                                      animate={{
                                        scale: [
                                          1,
                                          1.35,
                                          1,
                                        ],
                                        opacity: [
                                          0.65,
                                          1,
                                          0.65,
                                        ],
                                      }}
                                      transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        delay:
                                          achievementIndex *
                                          0.12,
                                      }}
                                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
                                    />

                                    <span>
                                      {achievement}
                                    </span>
                                  </motion.div>
                                )
                              )}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-2">
                              {experience.technologies.map(
                                (
                                  technology,
                                  technologyIndex
                                ) => (
                                  <motion.span
                                    key={technology}
                                    initial={{
                                      opacity: 0,
                                      scale: 0.85,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      scale: 1,
                                    }}
                                    transition={{
                                      delay:
                                        technologyIndex *
                                        0.035,
                                    }}
                                    whileHover={{
                                      y: -3,
                                      scale: 1.05,
                                    }}
                                    className={`rounded-full border px-3 py-1.5 text-xs ${styles.badge}`}
                                  >
                                    {technology}
                                  </motion.span>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SummaryMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.04,
      }}
      className="min-w-20 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"
    >
      <p className="text-lg font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.17em] text-white/35">
        {label}
      </p>
    </motion.div>
  );
}