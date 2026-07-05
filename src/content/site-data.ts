/**
 * SINGLE SOURCE OF CONTENT
 * ------------------------
 * Every piece of copy on the site lives here. All values below are realistic
 * dummy content for the fictional engineer "Adrian Vale" so the template reads
 * as a finished site. Swap them for real data — each field is flagged with
 * `// TODO: replace with real content`.
 */

export interface Experience {
  role: string;
  company: string;
  period: string;
  note: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  outcome: string;
  /** Hue (deg) that tints the generated placeholder cover. */
  hue: number;
  /**
   * [PLACEHOLDER IMAGE] — when a real cover exists, set `image` to a path in
   * /public and ProjectCard switches from the generated gradient to next/image.
   */
  image?: string;
  href?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export interface BentoTile {
  title: string;
  body: string;
  items?: string[];
  /** Grid span hint: "wide" = 2 cols on desktop. */
  size: "wide" | "normal";
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const siteData = {
  identity: {
    name: "Adrian Vale", // TODO: replace with real content
    initials: "IA", // TODO: replace with real content
    wordmark: "Ishimwe A", // footer ghost wordmark. TODO: replace with real content
    role: "Software Engineer", // TODO: replace with real content
    tagline: "Systems that feel effortless.", // TODO: replace with real content
    location: "Berlin, Germany", // TODO: replace with real content
    timezoneLabel: "Berlin", // TODO: replace with real content
    timezone: "Europe/Berlin", // TODO: replace with real content
    availability: "Open to select projects", // TODO: replace with real content
    email: "hello@adrianvale.dev", // TODO: replace with real content
    metaTitle: "Adrian Vale — Software Engineer", // TODO: replace with real content
    metaDescription:
      "Senior software engineer in Berlin building fast, resilient products — from real-time platforms to design systems.", // TODO: replace with real content
  },

  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ], // TODO: replace with real content (if section names change)
    cta: { label: "Let's talk", href: "#contact" }, // TODO: replace with real content
  },

  hero: {
    eyebrow: "Portfolio — 2026", // TODO: replace with real content
    // Rendered as two masked lines of display type.
    headline: ["Building software", "with intent."], // TODO: replace with real content
    subline:
      "Senior engineer for teams that care how things feel — I design and ship the systems behind fast, calm, reliable products.", // TODO: replace with real content
    scrollCue: "Scroll", // TODO: replace with real content
  },

  about: {
    eyebrow: "About",
    heading: "Engineer first, but never only.", // TODO: replace with real content
    paragraphs: [
      "For the past nine years I've built products where the backend's reliability is felt in the frontend's calm — logistics platforms tracking tens of thousands of live events, incident tooling used at 3 a.m., design systems that let forty engineers ship one coherent product.", // TODO: replace with real content
      "I work across the stack but I'm happiest at the seams: where data model meets interface, where performance budgets meet ambition, where a team's velocity depends on the invisible glue being right.", // TODO: replace with real content
    ],
    stats: [
      { value: 9, suffix: "+", label: "Years shipping production software" },
      { value: 40, suffix: "k", label: "Events/sec on the busiest system I've scaled" },
      { value: 12, suffix: "", label: "Products taken from zero to launch" },
    ] as Stat[], // TODO: replace with real content
    experience: [
      {
        role: "Staff Engineer",
        company: "Northline Systems",
        period: "2023 — Now",
        note: "Real-time logistics platform; leading a team of six.",
      },
      {
        role: "Senior Engineer",
        company: "Helio Labs",
        period: "2020 — 2023",
        note: "Incident-response tooling; owned the live command center.",
      },
      {
        role: "Product Engineer",
        company: "Fathom Studio",
        period: "2018 — 2020",
        note: "Client work: fintech dashboards, e-commerce, design systems.",
      },
      {
        role: "Frontend Engineer",
        company: "Karta",
        period: "2017 — 2018",
        note: "Maps SDK team; performance on low-end devices.",
      },
    ] as Experience[], // TODO: replace with real content
  },

  work: {
    eyebrow: "Selected Work",
    heading: "Five projects, told properly.", // TODO: replace with real content
    projects: [
      {
        slug: "meridian",
        title: "Meridian",
        tagline: "Real-time logistics visibility",
        description:
          "A live control tower for freight — every shipment, sensor ping and ETA recalculation streamed onto one map. I led the event pipeline rebuild and the move to server-driven UI for the ops console.",
        year: "2025",
        role: "Staff Engineer · Platform lead",
        stack: ["Rust", "Kafka", "TypeScript", "Next.js", "WebSockets"],
        outcome: "40k events/sec sustained · p99 map update under 250ms",
        hue: 18,
      },
      {
        slug: "pulseboard",
        title: "Pulseboard",
        tagline: "Incident command, without the panic",
        description:
          "The screen an on-call engineer sees at 3 a.m. — timeline, blast radius, runbooks and comms in one keyboard-driven surface. Designed for degraded networks: it works when everything else is on fire.",
        year: "2024",
        role: "Senior Engineer · Product owner",
        stack: ["Next.js", "Go", "Postgres", "SSE", "Tailwind"],
        outcome: "Mean time-to-acknowledge down 38% across 200+ incidents",
        hue: 205,
      },
      {
        slug: "loomline",
        title: "Loomline",
        tagline: "A design system that ships itself",
        description:
          "Token pipeline, component library and docs site serving four product teams. Tokens flow from Figma to typed CSS variables in CI; breaking changes are caught by visual regression before review.",
        year: "2023",
        role: "Senior Engineer · DX",
        stack: ["TypeScript", "React", "Style Dictionary", "Storybook", "Playwright"],
        outcome: "New-surface build time cut from weeks to days for 40 engineers",
        hue: 280,
      },
      {
        slug: "atlas-relay",
        title: "Atlas Relay",
        tagline: "An edge gateway migration nobody noticed",
        description:
          "Moved a monolith's public API behind an edge gateway — auth, rate-limiting and caching at 30 PoPs — with zero downtime over a four-month rollout. The best compliment: users never knew.",
        year: "2022",
        role: "Senior Engineer · Infra",
        stack: ["Cloudflare Workers", "Redis", "OpenAPI", "Terraform"],
        outcome: "Global p99 latency 610ms → 140ms · zero-downtime cutover",
        hue: 45,
      },
      {
        slug: "fieldnotes",
        title: "Fieldnotes",
        tagline: "Local-first notes, open source",
        description:
          "A weekend project that grew: offline-first notes with CRDT sync, end-to-end encryption and a sub-50KB core. Maintained in the open with a small, opinionated contributor community.",
        year: "2021 — Now",
        role: "Creator · Maintainer",
        stack: ["TypeScript", "CRDTs", "IndexedDB", "Vite"],
        outcome: "4.1k GitHub stars · 99 contributors · used daily by yours truly",
        hue: 150,
      },
    ] as Project[], // TODO: replace with real content
  },

  skills: {
    eyebrow: "Capabilities",
    heading: "Depth where it counts, range where it helps.", // TODO: replace with real content
    bento: [
      {
        title: "Product engineering",
        body: "Interfaces that stay fast under real data. React server components, streaming, optimistic UI, motion that respects the reader.",
        items: ["TypeScript", "React / Next.js", "Tailwind", "Framer Motion"],
        size: "wide",
      },
      {
        title: "Systems & data",
        body: "Event pipelines, APIs and storage designed for the failure case first.",
        items: ["Rust", "Go", "Postgres", "Kafka", "Redis"],
        size: "normal",
      },
      {
        title: "Infrastructure",
        body: "Boring, observable deploys. If it isn't graphed, it isn't done.",
        items: ["Terraform", "Cloudflare", "AWS", "Grafana"],
        size: "normal",
      },
      {
        title: "Currently exploring",
        body: "Local-first sync engines, WebGPU compute, and how far the edge can carry application state.",
        size: "normal",
      },
      {
        title: "Principles",
        body: "Latency is a feature. Delete more than you add. The team's speed is the architecture.",
        size: "wide",
      },
    ] as BentoTile[], // TODO: replace with real content
    marquee: [
      "TypeScript",
      "Rust",
      "React",
      "Next.js",
      "Go",
      "Postgres",
      "Kafka",
      "GraphQL",
      "Tailwind",
      "Terraform",
      "Cloudflare",
      "Node.js",
      "Redis",
      "Playwright",
    ], // TODO: replace with real content
    process: [
      {
        number: "01",
        title: "Understand",
        body: "A week of listening before a line of code — constraints, users, the metric that actually matters.",
      },
      {
        number: "02",
        title: "Architect",
        body: "The smallest system that survives success. Written down, argued over, then committed to.",
      },
      {
        number: "03",
        title: "Build",
        body: "Vertical slices shipped weekly. Real data early, feature flags everywhere, demos over decks.",
      },
      {
        number: "04",
        title: "Harden",
        body: "Load tests, chaos drills, accessibility passes and the unglamorous 10% that makes it production.",
      },
    ] as ProcessStep[], // TODO: replace with real content
  },

  testimonials: {
    eyebrow: "Kind words",
    heading: "People I've shipped with.", // TODO: replace with real content
    items: [
      {
        quote:
          "Adrian is the engineer you hand the scariest part of the roadmap to. He rebuilt our event pipeline mid-flight — traffic doubled, nobody outside the team ever knew.",
        name: "Mara Lindqvist",
        title: "VP Engineering, Northline Systems",
      },
      {
        quote:
          "Rare combination: systems depth and genuine taste. Our incident tooling went from a wall of red text to something people actually trust at 3 a.m.",
        name: "Deniz Okafor",
        title: "Head of Platform, Helio Labs",
      },
      {
        quote:
          "He treats developer experience as a product. Loomline changed how four teams work — and he documented it well enough that it outlived his tenure.",
        name: "Sofia Reyes",
        title: "Design Director, Fathom Studio",
      },
    ] as Testimonial[], // TODO: replace with real content
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions, answered.", // TODO: replace with real content
    items: [
      {
        q: "What kind of work are you best suited for?",
        a: "Ambitious product and platform work — real-time systems, performance-critical frontends, design systems, and the glue between them. If it needs to be fast, resilient and pleasant to use, that's my lane.",
      },
      {
        q: "Do you work solo or embed with a team?",
        a: "Both. I can own a slice end-to-end as an individual contributor, or embed with an existing team and lift its velocity — reviewing, mentoring and setting the architectural direction as I go.",
      },
      {
        q: "What does a typical engagement look like?",
        a: "A week of discovery to pin down constraints and the metric that matters, then vertical slices shipped weekly with real data early. You see working software, not decks, from the second week on.",
      },
      {
        q: "Which stacks do you reach for?",
        a: "TypeScript and React/Next.js on the front, Rust or Go for services, Postgres and event streaming for data, and boring, observable infrastructure underneath. I pick the tool the problem asks for, not the one on the sticker.",
      },
      {
        q: "Are you available right now?",
        a: "I take on a small number of select projects at a time so each gets real attention. Reach out with what you're building and I'll tell you honestly where I'm at.",
      },
    ], // TODO: replace with real content
  },

  contact: {
    eyebrow: "Contact",
    headline: ["Let's build", "something good."], // TODO: replace with real content
    body: "Currently taking on select projects for 2026. If you're building something that needs to be fast, resilient and pleasant to use — tell me about it.", // TODO: replace with real content
    socials: [
      { label: "GitHub", href: "https://github.com/username" }, // TODO: replace with real content
      { label: "LinkedIn", href: "https://linkedin.com/in/username" }, // TODO: replace with real content
      { label: "X / Twitter", href: "https://x.com/username" }, // TODO: replace with real content
      { label: "CV / Résumé", href: "#" }, // TODO: replace with real content
    ],
  },

  footer: {
    colophon: "Designed & built by Ishimwe A", // TODO: replace with real content
    note: "Next.js · Tailwind · GSAP · Lenis · R3F", // TODO: replace with real content
  },
} as const;

export type SiteData = typeof siteData;
