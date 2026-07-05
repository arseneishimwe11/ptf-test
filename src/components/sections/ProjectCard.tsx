import Image from "next/image";
import type { Project } from "@/content/site-data";

/**
 * One case study. Cover is a generated gradient + noise composition tinted by
 * the project's hue — [PLACEHOLDER IMAGE] until `project.image` is set in
 * content/site-data.ts, at which point next/image takes over. The cover
 * carries a glass caption bar (the Jayden treatment); the right column holds
 * the case-study detail.
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="group grid h-full overflow-hidden rounded-card border border-line bg-surface md:grid-cols-2">
      {/* Cover */}
      <div className="relative min-h-[240px] overflow-hidden md:min-h-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(min-width: 768px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="cover-gradient cover-noise absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:scale-[1.04]"
            style={{ "--cover-hue": project.hue } as React.CSSProperties}
          />
        )}
        <span className="absolute left-6 top-5 font-mono text-xs tracking-[0.16em] text-[#f4f2ed]/70">
          {String(index + 1).padStart(2, "0")} / {project.year}
        </span>

        {/* Glass caption bar */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-[10px] border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-md">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#f4f2ed]/85">
            {project.tagline}
          </span>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[#0f0e0c] transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </div>
      </div>

      {/* Case study */}
      <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="heading text-3xl md:text-4xl">{project.title}</h3>
            <span className="font-mono text-xs tracking-[0.14em] text-muted">
              {project.year}
            </span>
          </div>
          <p className="mt-5 leading-relaxed text-muted">{project.description}</p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] tracking-[0.1em] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="hairline pt-4">
            <p className="eyebrow mb-1.5">Role</p>
            <p className="text-sm text-ink">{project.role}</p>
          </div>
          <div className="hairline pt-4">
            <p className="eyebrow mb-1.5">Outcome</p>
            <p className="text-sm text-ink">{project.outcome}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
