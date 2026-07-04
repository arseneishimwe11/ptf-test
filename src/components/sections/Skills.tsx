import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

/**
 * Capability map: Platform®-style bento grammar (mixed-size tiles, one gap
 * system) + a Lyniq-style ticker as the section's divider + the numbered
 * process strip. Server component — motion comes from Reveal/CSS only.
 */
export default function Skills() {
  const { skills } = siteData;

  return (
    <section id="skills" className="section-pad">
      <div className="container-site">
        <Eyebrow>{skills.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="display mb-16 max-w-2xl text-4xl md:text-6xl">
            {skills.heading}
          </h2>
        </Reveal>

        {/* Bento */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.bento.map((tile, i) => (
            <Reveal
              key={tile.title}
              delay={0.06 * i}
              className={tile.size === "wide" ? "sm:col-span-2" : ""}
            >
              <div className="flex h-full flex-col justify-between gap-8 rounded-card border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40">
                <div>
                  <h3 className="mb-3 text-lg text-ink">{tile.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{tile.body}</p>
                </div>
                {tile.items && (
                  <ul className="flex flex-wrap gap-2">
                    {tile.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-raised px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-muted"
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
