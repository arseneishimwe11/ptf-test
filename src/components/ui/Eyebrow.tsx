import Reveal from "./Reveal";

/**
 * Recurring section micro-label (the observed instrument-panel texture on
 * Hanza/Davies/Sensoria): mono, uppercase, with an optional `NN /` index and
 * a trailing hairline. Same reveal everywhere = the site's continuity grammar.
 */
export default function Eyebrow({
  children,
  index,
}: {
  children: React.ReactNode;
  /** Two-digit section index, e.g. "01" — rendered in the accent color. */
  index?: string;
}) {
  return (
    <Reveal y={16}>
      <div className="mb-10 flex items-center gap-4">
        {index ? (
          <span className="font-mono text-xs tracking-[0.16em] text-accent">
            {index} /
          </span>
        ) : (
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        )}
        <span className="eyebrow">{children}</span>
        <span aria-hidden className="hairline h-px flex-1" />
      </div>
    </Reveal>
  );
}
