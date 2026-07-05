"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/content/site-data";

/**
 * Editorial close (observed on Majd/Lyniq/Hanza): a giant clipped ghost
 * wordmark with a Davies-style blinking terminal underscore, a mono colophon,
 * a live local-time readout and a back-to-top with a rolling-text hover.
 */
export default function Footer() {
  const { identity, footer } = siteData;
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: identity.timezone,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, [identity.timezone]);

  return (
    <footer className="band-dark relative z-10 overflow-hidden pt-10">
      <div className="container-site">
        <div className="hairline flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.12em] text-muted">
            {footer.colophon} · © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-xs tracking-[0.12em] text-muted">
            {identity.timezoneLabel}{" "}
            <span className="tabular text-ink" suppressHydrationWarning>
              {time ?? "--:--:--"}
            </span>
          </p>
          <div className="flex items-center gap-8">
            <p className="font-mono text-xs tracking-[0.12em] text-muted">
              {footer.note}
            </p>
            <a
              href="#top"
              className="roll font-mono text-xs uppercase tracking-[0.18em] text-muted"
            >
              <span>Top ↑</span>
              <span className="text-accent">Top ↑</span>
            </a>
          </div>
        </div>
      </div>

      {/* Giant ghost wordmark, sized to fit the container width */}
      <div
        aria-hidden
        className="container-site pointer-events-none select-none pb-8 pt-4"
      >
        <p className="display whitespace-nowrap text-center leading-[0.82] text-[clamp(2.25rem,12.5vw,10.5rem)] text-ink/[0.07]">
          {identity.wordmark}
          <span className="align-top text-[0.4em] text-accent/50">®</span>
        </p>
      </div>
    </footer>
  );
}
