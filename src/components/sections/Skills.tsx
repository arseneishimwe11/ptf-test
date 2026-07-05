import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

/**
 * Capability map on a dark band: Platform®-style bento (sharp 8px tiles, 1px
 * lines, `//` mono kickers) + a marquee divider + the numbered process strip.
 * Server component — motion comes from Reveal/CSS only.
 */
export default function Skills() {
  const { skills } = siteData;

  return (
    <section id="skills" className="band-dark relative z-10 section-pad">
      <div className="container-site">
        <Eyebrow index="03">{skills.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="heading mb-16 max-w-2xl text-4xl md:text-6xl">
            {skills.heading}
          </h2>
        </Reveal>

        {/* Bento */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skills.bento.map((tile, i) => (
            <Reveal
              key={tile.title}
              delay={0.06 * i}
              className={tile.size === "wide" ? "sm:col-span-2" : ""}
            >
              <div className="flex h-full flex-col justify-between gap-8 rounded-tile border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40">
                <div>
                  <div className="mb-4 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
                    {`// ${String(i + 1).padStart(2, "0")}`}
                  </div>
                  <h3 className="mb-3 text-lg text-ink">{tile.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{tile.body}</p>
                </div>
                {tile.items && (
                  <ul className="flex flex-wrap gap-2">
                    {tile.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-raised px-3 py-1 font-mono text-[0.68rem] tracking-[0.1em] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Ticker divider */}
      <div className="my-20">
        <Marquee items={skills.marquee} />
      </div>

      {/* Process */}
      <div className="container-site">
        <Reveal>
          <h3 className="eyebrow mb-10">How I work</h3>
        </Reveal>
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {skills.process.map((step, i) => (
            <Reveal key={step.number} delay={0.09 * i}>
              <li className="hairline pt-6">
                <span className="font-mono text-sm text-accent">{step.number}</span>
                <h4 className="mt-3 text-lg text-ink">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
