import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/**
 * Deliberately quiet (the Hanza lesson): serif pull-quotes, hairline rules,
 * one reveal each. No carousel, no autoplay — motion must earn its place.
 */
export default function Testimonials() {
  const { testimonials } = siteData;

  return (
    <section id="testimonials" className="section-pad">
      <div className="container-site">
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="display mb-16 max-w-xl text-4xl md:text-5xl">
            {testimonials.heading}
          </h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * i}>
              <figure className="flex h-full flex-col justify-between gap-10 rounded-card border border-line bg-surface p-8">
                <blockquote className="font-display text-xl leading-snug text-ink md:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="hairline pt-5">
                  <p className="text-sm text-ink">{t.name}</p>
                  <p className="mt-1 text-sm text-muted">{t.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
