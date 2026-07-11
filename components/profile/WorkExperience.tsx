"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
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
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "Arcadian Tech Services Pvt. Ltd.",
    position: "WordPress Developer Intern",
    location: "India",
    period: "October 2023 – March 2024",
    description:
      "Developed and maintained responsive WordPress websites while improving layout quality, performance, and overall usability.",
    achievements: [
      "Implemented website features using WordPress and Elementor.",
      "Improved page structure, responsiveness, and content presentation.",
      "Created demonstration websites using WordPress, Elementor, and XAMPP.",
      "Supported website architecture and performance improvements.",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "HTML",
      "CSS",
      "JavaScript",
      "XAMPP",
    ],
  },
  {
    id: 2,
    company: "Domino’s",
    position: "Assistant Manager",
    location: "Bangalore, India",
    period: "November 2021 – July 2022",
    description:
      "Supported daily store operations, team coordination, workflow management, and customer service in a fast-paced environment.",
    achievements: [
      "Coordinated staff schedules and daily operational workflows.",
      "Maintained records, budgets, and inventory-related processes.",
      "Helped improve team organization during high-volume shifts.",
      "Resolved operational and customer-service issues efficiently.",
    ],
    technologies: [
      "Team Leadership",
      "Operations",
      "Inventory",
      "Customer Service",
    ],
  },
  {
    id: 3,
    company: "Domino’s",
    position: "Guest Delight Associate",
    location: "Bangalore, India",
    period: "September 2019 – June 2021",
    description:
      "Supported customers and store operations while gaining experience in teamwork, inventory management, and service delivery.",
    achievements: [
      "Provided customer support in a high-volume environment.",
      "Assisted with ordering, stock monitoring, and inventory tasks.",
      "Collaborated with team members to maintain smooth operations.",
    ],
    technologies: [
      "Customer Support",
      "Inventory",
      "Communication",
      "Teamwork",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function WorkExperience() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <motion.div
        variants={cardVariants}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Professional journey
            </p>

            <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
              Work Experience
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-3xl leading-7 text-slate-400">
          My experience combines software development,
          website implementation, operations, customer
          service, and team coordination.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute bottom-8 left-[23px] top-8 hidden w-px bg-gradient-to-b from-cyan-400/70 via-blue-500/30 to-transparent sm:block" />

        <div className="grid gap-6">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
              }}
              className="group relative sm:pl-20"
            >
              <div className="absolute left-0 top-8 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-[#07111f] text-sm font-bold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)] sm:flex">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition duration-300 group-hover:border-cyan-400/25 group-hover:bg-white/[0.055] sm:p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl font-semibold text-white sm:text-2xl">
                          {experience.position}
                        </h4>

                        {experience.current && (
                          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                            </span>

                            Current
                          </span>
                        )}
                      </div>

                      <p className="mt-2 font-medium text-cyan-300">
                        {experience.company}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-slate-400 lg:items-end">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-cyan-400" />
                        {experience.period}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 leading-7 text-slate-300">
                    {experience.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {experience.achievements.map(
                      (achievement) => (
                        <div
                          key={achievement}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-400 sm:text-base"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                          <span>{achievement}</span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {experience.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-400 transition group-hover:border-cyan-400/15 group-hover:text-slate-300"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}