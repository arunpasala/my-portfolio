"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiGithub,
  SiGit,
  SiRedis,
  SiDocker,
  SiLinux,
} from "react-icons/si";

const row1 = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
];

const row2 = [
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma ORM", icon: SiPrisma },
  { name: "Redis", icon: SiRedis },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "GitHub", icon: SiGithub },
  { name: "Git", icon: SiGit },
];

const row3 = [
  { name: "Docker", icon: SiDocker },
  { name: "Linux", icon: SiLinux },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "MongoDB", icon: SiMongodb },
];

function Badge({ item }: { item: { name: string; icon: React.ElementType } }) {
  const Icon = item.icon;

  return (
    <div className="mx-4 flex min-w-max items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-white/10">
      <Icon className="h-5 w-5 text-cyan-300" />
      <span className="whitespace-nowrap text-sm font-semibold text-slate-200">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 22,
}: {
  items: typeof row1;
  direction?: "left" | "right";
  duration?: number;
}) {
  return (
    <motion.div
      className="flex w-max"
      animate={
        direction === "left"
          ? { x: ["0%", "-50%"] }
          : { x: ["-50%", "0%"] }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...items, ...items, ...items].map((item, index) => (
        <Badge key={`${item.name}-${index}`} item={item} />
      ))}
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#08080b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#08080b] to-transparent" />

      <div className="space-y-7">
        <MarqueeRow items={row1} direction="left" duration={20} />
        <MarqueeRow items={row2} direction="right" duration={27} />
        <MarqueeRow items={row3} direction="left" duration={24} />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-slate-200/90 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.45)] backdrop-blur-[2px]">
        <div className="absolute -bottom-10 -right-6 h-16 w-4 rotate-[-45deg] rounded-full bg-slate-300" />
      </div>
    </div>
  );
}