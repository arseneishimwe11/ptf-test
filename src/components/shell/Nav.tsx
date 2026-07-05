"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteData } from "@/content/site-data";
import { useLoader } from "@/components/providers/LoaderContext";
import { useReducedMotion } from "@/lib/media";

const SECTION_IDS = ["about", "work", "skills", "contact"];

/**
 * Fixed bar that stays out of the content's way: transparent at the top,
 * glass after 48px, slides away on scroll-down and returns on scroll-up
 * (the "content is the star" pattern). Mobile gets a full-screen sheet with
 * staggered links.
 */
export default function Nav() {
  const { done } = useLoader();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const yPos = window.scrollY;
      setScrolled(yPos > 48);
      setHidden(yPos > 160 && yPos > lastY.current && !open);
      lastY.current = yPos;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[80] band-dark transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-ground/80 backdrop-blur-md"
            : "border-b border-transparent !bg-transparent"
        }`}
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{
          y: hidden && !reduced ? -80 : 0,
          opacity: done || reduced ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Primary"
          className="container-site flex h-[68px] items-center justify-between"
        >
          <a
            href="#top"
            data-cursor="link"
            className="text-xl font-bold tracking-tight text-ink"
            aria-label={`${siteData.identity.name} — back to top`}
          >
            {siteData.identity.initials}
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {siteData.nav.links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    data-cursor="link"
                    className={`text-sm transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                    />
                  )}
                </li>
              );
            })}
            <li>
              <a
                href={siteData.nav.cta.href}
                data-cursor="link"
                className="rounded-full border border-line px-5 py-2 text-sm transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {siteData.nav.cta.label}
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-center band-dark bg-ground/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="container-site flex flex-col gap-2">
              {[...siteData.nav.links, siteData.nav.cta].map((link, i) => (
                <motion.li
                  key={link.href + link.label}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1.04, 0.32, 0.98] }}
                >
                  <a
                    href={link.href}
                    className="display block py-3 text-5xl text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
