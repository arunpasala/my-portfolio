"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

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

const projects: Project[] = [
  {
    title: "CircleSave",
    subtitle: "Fintech Platform",
    desc:
      "A secure community savings platform built around transparent contributions, role-based access, membership management, notifications, and structured payout workflows.",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
    ],
    image: "/projects/circlesave.png",
    live: "https://your-circlesave-link.vercel.app",
    code:
      "https://github.com/arunpasala/projectcirclesave",
  },
  {
    title: "AI Student Performance",
    subtitle: "Machine Learning Application",
    desc:
      "A machine-learning application that predicts student performance using academic and behavioral data while presenting insights through an interactive dashboard.",
    tech: [
      "Python",
      "Scikit-learn",
      "React",
      "Node.js",
      "MySQL",
    ],
    image: "/projects/student-performance.png",
    live: "",
    code: "https://github.com/arunpasala",
  },
  {
    title: "AI & Project Management",
    subtitle: "AI Research Project",
    desc:
      "A research-driven project exploring artificial intelligence in planning, risk analysis, fairness evaluation, decision-making, and project execution.",
    tech: [
      "Python",
      "Machine Learning",
      "Pandas",
      "Scikit-learn",
      "Research",
    ],
    image:
      "/projects/ai-project-management.png",
    live: "",
    code: "https://github.com/arunpasala",
  },
  {
    title: "Library Management System",
    subtitle: "Full-Stack Web Application",
    desc:
      "A full-stack library platform with secure authentication, book management, user workflows, borrowing controls, and database-backed operations.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    image:
      "/projects/library-management.png",
    live: "",
    code: "https://github.com/arunpasala",
  },
  {
    title: "AI Chatbot",
    subtitle: "Conversational Web Application",
    desc:
      "A conversational assistant integrating weather, news, and external services through a responsive React frontend and Flask backend.",
    tech: [
      "React",
      "Flask",
      "Python",
      "Dialogflow",
      "REST APIs",
    ],
    image: "/projects/chatbot.png",
    live: "",
    code: "https://github.com/arunpasala",
  },
  {
    title: "Business Website Projects",
    subtitle: "Frontend & WordPress Development",
    desc:
      "Responsive business websites focused on visual hierarchy, accessibility, performance, content organization, and polished user experiences.",
    tech: [
      "WordPress",
      "Elementor",
      "JavaScript",
      "CSS",
      "UI/UX",
    ],
    image:
      "/projects/business-websites.png",
    live: "",
    code: "https://github.com/arunpasala",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#050611] px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-10"
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -55, 0],
            y: [0, -35, 0],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[160px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ======================================================
            HEADING
        ====================================================== */}

        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.35,
          }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Selected Projects
            </p>

            <span className="h-px w-16 bg-gradient-to-r from-cyan-400/70 to-transparent" />
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Ideas transformed into{" "}
            <span className="projects-gradient-text">
              useful and scalable products.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            A selection of full-stack, frontend, backend,
            fintech, machine-learning, and web-development
            projects built with a focus on usability,
            performance, security, and maintainable
            architecture.
          </p>
        </motion.div>

        {/* ======================================================
            PROJECT COUNTER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.6,
          }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
            {String(projects.length).padStart(2, "0")}
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Featured projects
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Full-stack, frontend, backend, AI, and
              WordPress work
            </p>
          </div>
        </motion.div>

        {/* ======================================================
            PROJECT GRID
        ====================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 45,
                  scale: 0.97,
                  filter: "blur(8px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="h-full"
            >
              <ProjectCard
                project={{
                  ...project,
                  index: index + 1,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ======================================================
            BOTTOM MESSAGE
        ====================================================== */}

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
          }}
          transition={{
            duration: 0.65,
          }}
          className="mt-16 flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-2xl sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              More work on GitHub
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-white">
              Explore additional experiments and
              repositories.
            </h3>

            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              My GitHub includes learning projects, API
              experiments, full-stack applications, machine
              learning work, and ongoing product development.
            </p>
          </div>

          <motion.a
            href="https://github.com/arunpasala"
            target="_blank"
            rel="noreferrer"
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
          >
            <GitHubIcon className="h-5 w-5" />
            View GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function GitHubIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 7.13a9.2 9.2 0 0 1 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}