"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        label="Services"
        title="What I can help build and improve."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/8 p-7 backdrop-blur-2xl"
            >
              <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                {service.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}