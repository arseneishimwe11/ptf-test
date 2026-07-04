/**
 * Infinite ticker (the Lyniq divider idiom). Pure CSS animation — zero
 * main-thread cost; pauses on hover and disappears into a static row under
 * prefers-reduced-motion (see globals.css).
 */
export default function Marquee({ items }: { items: readonly string[] }) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-6 pr-6 font-mono text-sm uppercase tracking-[0.18em] text-muted"
        >
          {item}
          <span aria-hidden className="text-accent">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee hairline overflow-hidden border-b border-line py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
