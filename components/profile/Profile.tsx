import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

export default function Profile() {
  return (
    <section id="profile" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        label="Profile"
        title="A professional introduction that feels modern and credible."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT CARD */}
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-3xl font-bold text-cyan-300">
            AP
          </div>

          <h3 className="mt-6 text-2xl font-semibold">
            Arun Pasala
          </h3>

          <p className="mt-2 text-slate-400">
            Full-Stack Developer | Next.js Developer | UI-Focused Builder
          </p>

          <p className="mt-6 leading-8 text-slate-300">
            I build web products that combine strong frontend design,
            practical backend logic, and professional user experiences.
            My focus is on creating applications that feel polished,
            scalable, and useful.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Education
              </p>

              <p className="mt-3 text-lg font-semibold text-white">
                Master's in Computer Science
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
                WordPress Development
              </p>

              <p className="mt-2 text-slate-300">
                Frontend, UI work, client-focused web delivery
              </p>
            </div>

          </div>

          <div className="mt-8">

            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Skills
            </p>

            <div className="mt-4 flex flex-wrap gap-3">

              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
