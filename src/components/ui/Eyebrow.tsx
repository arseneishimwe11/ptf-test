import Reveal from "./Reveal";

/**
 * Recurring section micro-label (the Sensoria "instrument label" texture):
 * mono, uppercase, tick + hairline. Same reveal everywhere = the site's
 * continuity grammar.
 */
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={16}>
      <div className="mb-10 flex items-center gap-4">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="eyebrow">{children}</span>
        <span aria-hidden className="hairline h-px flex-1" />
      </div>
    </Reveal>
  );
}
