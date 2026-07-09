import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  live: string;
  code: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-[2rem] border border-white/10 bg-white/8 p-7 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[0.09]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-300">{project.subtitle}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {project.title}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <ExternalLink className="h-4 w-4 text-slate-200" />
        </div>
      </div>

      <p className="mt-5 leading-7 text-slate-300">{project.desc}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href={project.live}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950"
        >
          Live Demo
        </a>

        <a
          href={project.code}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white"
        >
          Source Code
        </a>
      </div>
    </div>
  );
}