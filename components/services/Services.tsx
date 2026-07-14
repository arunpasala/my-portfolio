"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CloudCog,
  Code2,
  DatabaseZap,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

type AccentName =
  | "cyan"
  | "blue"
  | "purple"
  | "emerald";

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: typeof Code2;
  accent: AccentName;
};

const services: Service[] = [
  {
    title: "Backend Engineering",
    description:
      "Scalable backend systems, REST APIs, microservices, and real-time services built with Java, Spring Boot, Node.js, and Express.",
    features: [
      "RESTful APIs",
      "Microservices",
      "WebSockets",
      "Distributed systems",
    ],
    icon: ServerCog,
    accent: "cyan",
  },
  {
    title: "Full-Stack Applications",
    description:
      "Production-ready applications combining responsive React interfaces with secure backend services and reliable database architecture.",
    features: [
      "React and Next.js",
      "Authentication",
      "Responsive dashboards",
      "End-to-end workflows",
    ],
    icon: Code2,
    accent: "blue",
  },
  {
    title: "Database and API Integration",
    description:
      "Efficient data models, optimized queries, third-party APIs, and secure integrations across SQL, MongoDB, healthcare, and SaaS systems.",
    features: [
      "PostgreSQL and MySQL",
      "MongoDB",
      "OAuth 2.0 and JWT",
      "FHIR, HL7, JSON and XML",
    ],
    icon: DatabaseZap,
    accent: "purple",
  },
  {
    title: "Cloud and DevOps",
    description:
      "Cloud-ready applications supported by containerization, automated delivery pipelines, monitoring, and production-focused engineering.",
    features: [
      "AWS and Azure",
      "Docker",
      "GitHub Actions",
      "Jenkins and CI/CD",
    ],
    icon: CloudCog,
    accent: "emerald",
  },
  {
    title: "AI-Powered Workflows",
    description:
      "AI and machine-learning services integrated into practical applications for automation, prediction, optimization, and intelligent insights.",
    features: [
      "Machine learning services",
      "Route optimization",
      "Predictive maintenance",
      "Computer vision workflows",
    ],
    icon: BrainCircuit,
    accent: "cyan",
  },
  {
    title: "Secure Application Development",
    description:
      "Secure authentication, authorization, API validation, role-based access, and reliable workflows for sensitive and data-intensive platforms.",
    features: [
      "OAuth 2.0",
      "JWT authentication",
      "Role-based access",
      "Secure API design",
    ],
    icon: ShieldCheck,
    accent: "blue",
  },
];

const accentStyles: Record<
  AccentName,
  {
    icon: string;
    iconBg: string;
    border: string;
    glow: string;
    bullet: string;
    line: string;
  }
> = {
  cyan: {
    icon: "text-cyan-300",
    iconBg: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/35",
    glow: "bg-cyan-500/15",
    bullet: "bg-cyan-400",
    line: "from-cyan-400/60",
  },

  blue: {
    icon: "text-blue-300",
    iconBg: "bg-blue-400/10",
    border: "group-hover:border-blue-400/35",
    glow: "bg-blue-500/15",
    bullet: "bg-blue-400",
    line: "from-blue-400/60",
  },

  purple: {
    icon: "text-purple-300",
    iconBg: "bg-purple-400/10",
    border: "group-hover:border-purple-400/35",
    glow: "bg-purple-500/15",
    bullet: "bg-purple-400",
    line: "from-purple-400/60",
  },

  emerald: {
    icon: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/35",
    glow: "bg-emerald-500/15",
    bullet: "bg-emerald-400",
    line: "from-emerald-400/60",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050611] px-6 py-24 text-white sm:py-28"
    >
      {/* ======================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, 35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[6%] top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -55, 0],
            y: [0, -35, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-[5%] h-96 w-96 rounded-full bg-purple-500/10 blur-[165px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ======================================================
            HEADING
        ====================================================== */}

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
            amount: 0.35,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
              Services
            </p>

            <span className="h-px w-16 bg-gradient-to-r from-cyan-400/70 to-transparent" />
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Engineering solutions that are{" "}
            <span className="services-gradient-text">
              scalable, secure, and production-ready.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            I help build reliable full-stack products through backend
            engineering, modern frontend development, database optimization,
            cloud deployment, secure integrations, and AI-powered workflows.
          </p>
        </motion.header>

        {/* ======================================================
            SERVICES GRID
        ====================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const styles =
              accentStyles[service.accent];

            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.012,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className={`group relative flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_25px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-colors duration-300 sm:p-8 ${styles.border}`}
              >
                {/* Moving light */}

                <motion.div
                  animate={{
                    x: ["-160%", "300%"],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    repeatDelay: 1.5 + index * 0.5,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
                />

                {/* Hover glow */}

                <div
                  className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[110px] transition-opacity duration-500 ${styles.glow} opacity-30 group-hover:opacity-90`}
                />

                <div className="relative flex h-full flex-col">
                  {/* Icon */}

                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4.5 + index * 0.4,
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
                        scale: [1, 1.38, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 2.3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-2xl border border-white/15"
                    />
                  </motion.div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-white/30">
                    Service 0{index + 1}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-5 leading-7 text-slate-400">
                    {service.description}
                  </p>

                  {/* Features */}

                  <div className="mt-7 grid gap-3">
                    {service.features.map(
                      (feature, featureIndex) => (
                        <motion.div
                          key={feature}
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
                            delay:
                              index * 0.1 +
                              featureIndex * 0.07,
                          }}
                          className="flex items-center gap-3 text-sm text-slate-400"
                        >
                          <motion.span
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              delay:
                                featureIndex * 0.15,
                            }}
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${styles.bullet}`}
                          />

                          {feature}
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Bottom line */}

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
                      delay: 0.35 + index * 0.1,
                      duration: 0.75,
                    }}
                    className={`mt-auto h-px origin-left bg-gradient-to-r ${styles.line} to-transparent pt-8`}
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}