import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitLines from "@/components/ui/SplitLines";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * One job (the Davies lesson): start a conversation. Dark showpiece band,
 * uppercase statement with an accent second line, oversized email link with
 * a rolling-text hover, socials as a quiet mono row.
 */
export default function Contact() {
  const { contact, identity } = siteData;

  return (
    <section
      id="contact"
      className="band-dark relative z-10 section-pad-lg flex min-h-svh flex-col justify-center"
    >
      <div className="container-site">
        <Eyebrow index="05">{contact.eyebrow}</Eyebrow>

        <SplitLines
          lines={contact.headline}
          accentLines={[contact.headline.length - 1]}
          className="display text-[clamp(2.75rem,9vw,8rem)]"
        />

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-lg leading-relaxed text-muted">
            {contact.body}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14">
            <MagneticButton
              href={`mailto:${identity.email}`}
              className="group inline-flex items-center gap-4 text-[clamp(1.4rem,4.5vw,3.25rem)] font-medium tracking-tight text-ink"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:-translate-y-full">
                  {identity.email}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 block translate-y-full text-accent transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:translate-y-0"
                >
                  {identity.email}
                </span>
              </span>
              <span
                aria-hidden
                className="text-accent transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:translate-x-2"
              >
                →
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <ul className="mt-20 flex flex-wrap gap-x-8 gap-y-4">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="roll font-mono text-xs uppercase tracking-[0.18em] text-muted"
                >
                  <span>{social.label}</span>
                  <span className="text-accent">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
