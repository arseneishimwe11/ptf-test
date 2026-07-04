"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/content/site-data";

/**
 * Editorial close (Lyniq/Platform® treatment): a giant wordmark clipped at
 * the baseline, colophon meta, live local-time readout, back-to-top.
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
    <footer className="relative overflow-hidden pt-10">
      <div className="container-site">
        <div className="hairline flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {footer.colophon} · © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-xs tracking-[0.15em] text-muted">
            {identity.timezoneLabel}{" "}
            <span className="tabular text-ink" suppressHydrationWarning>
              {time ?? "--:--:--"}
            </span>
          </p>
          <div className="flex items-center gap-8">
            <p className="font-mono text-xs tracking-[0.15em] text-muted">
              {footer.note}
            </p>
            <a
              href="#top"
              data-cursor="link"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              Top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Giant clipped wordmark */}
      <div aria-hidden className="pointer-events-none select-none">
        <p className="display -mb-[0.24em] whitespace-nowrap text-center text-[clamp(4rem,17vw,17rem)] leading-none text-ink/[0.06]">
          {identity.name}
        </p>
      </div>
    </footer>
  );
}
