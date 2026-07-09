"use client";

import { motion } from "framer-motion";
import RotatingGlobe from "./RotatingGlobe";
import TechStack from "./TechStack";

const cards = [
  {
    label: "LET'S BUILD TOGETHER",
    title: "Clear communication, fast iterations, no surprises",
  },
  {
    label: "TECH STACK",
    title: "The stack behind everything I ship",
  },
   {
    label: "FLEXIBLE WITH TIMEZONES",
    title: "Based in USA, available globally",
  },
  {
    label: "WHAT YOU GET",
    title: "Clean code, pixel-perfect UI, deployed & scaling",
  },
];

export default function AnimatedShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-4 lg:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              {card.label}
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              {card.title}
            </h3>

            {index === 0     && (
              <div className="mt-8">
                <RotatingGlobe />
              </div>
            )}

            {index === 1 && (
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                <TechStack />
              </div>
            )}

            {index !== 0 && index !== 1 && (
              <div className="mt-10 h-48 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}