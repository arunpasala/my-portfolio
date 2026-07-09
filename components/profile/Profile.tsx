import SectionHeading from "@/components/ui/SectionHeading";

export default function Profile() {
  return (
    <section id="profile" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        label="Profile"
        title="Software Engineer focused on scalable full-stack products."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-3xl font-bold text-cyan-300">
            AP
          </div>

          <h3 className="mt-6 text-2xl font-semibold">Bala Arun Pasala</h3>

          <p className="mt-2 text-slate-400">
            Software Engineer | Full-Stack Developer | Backend & API Systems
          </p>

          <p className="mt-6 leading-8 text-slate-300">
            I build scalable web applications, REST APIs, microservices, and
            user-focused interfaces using Java, Spring Boot, Node.js, Express,
            React, and Tailwind CSS.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Education
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Master&apos;s in Computer Science
              </p>
              <p className="mt-2 text-slate-300">
                Western New England University
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Experience
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Software Engineer Associate
              </p>
              <p className="mt-2 text-slate-300">
                Node.js, Spring Boot, React, APIs, Microservices, CI/CD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}