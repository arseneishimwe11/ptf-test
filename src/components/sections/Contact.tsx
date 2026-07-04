import { siteData } from "@/content/site-data";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitLines from "@/components/ui/SplitLines";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * One job (the Davies lesson): start a conversation. Full-viewport
 * statement, oversized email link, socials as a quiet row.
 */
export default function Contact() {
  const { contact, identity } = siteData;

  return (
    <section
      id="contact"
      className="section-pad flex min-h-svh flex-col justify-center"
    >
      <div className="container-site">
        <Eyebrow>{contact.eyebrow}</Eyebrow>

        <SplitLines
          lines={contact.headline}
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
              className="group inline-flex items-center gap-4 text-[clamp(1.4rem,4.5vw,3.25rem)] tracking-tight text-ink"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {identity.email}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 block translate-y-full text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                >
                  {identity.email}
                </span>
              </span>
              <span
                aria-hidden
                className="text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
              >
                →
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <ul className="mt-20 flex flex-wrap gap-x-10 gap-y-4">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  data-cursor="link"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
