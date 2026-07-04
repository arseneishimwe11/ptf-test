import Image from "next/image";
import type { Project } from "@/content/site-data";

/**
 * One case study. The cover is a generated gradient + noise composition
 * tinted by the project's hue — [PLACEHOLDER IMAGE] until `project.image`
 * is set in content/site-data.ts, at which point next/image takes over.
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      data-cursor="view"
      className="grid h-full overflow-hidden rounded-card border border-line bg-surface md:grid-cols-2"
    >
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
            className="cover-gradient cover-noise absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{ "--cover-hue": project.hue } as React.CSSProperties}
          />
        )}
        <span className="display absolute bottom-5 left-6 text-7xl text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Case study */}
      <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="display text-3xl md:text-4xl">{project.title}</h3>
            <span className="font-mono text-xs tracking-[0.15em] text-muted">
              {project.year}
            </span>
          </div>
          <p className="mt-2 text-accent">{project.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{project.description}</p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="hairline pt-4">
            <p className="eyebrow mb-1.5">Role</p>
            <p className="text-sm">{project.role}</p>
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
