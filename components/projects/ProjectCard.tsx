import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  image?: string;
  live: string;
  code: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[0.09]">

      {/* Project Preview */}
      <div className="relative h-56 w-full overflow-hidden border-b border-white/10 bg-slate-900">

        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} Preview`}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800">
            <span className="text-slate-400">
              Preview Coming Soon
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900"
          >
            View Live Demo
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-7">

        <p className="text-sm text-cyan-300">
          {project.subtitle}
        </p>

        <h3 className="mt-2 text-2xl font-semibold text-white">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-slate-300">
          {project.desc}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            Live Demo
          </a>

          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
          >
            Source Code
          </a>
        </div>

      </div>
    </div>
  );
}