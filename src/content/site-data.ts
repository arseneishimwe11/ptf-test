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

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  /** Short honest status shown as a pill: "Live", "In progress", etc. */
  status: string;
  stack: string[];
  outcome: string;
  /** Public links (live product, store pages, public repo). Empty = none. */
  links: ProjectLink[];
  /** Shown when there is no public link, e.g. "Client work · code private". */
  linkNote?: string;
  /** Hue (deg) that tints the generated cover. */
  hue: number;
  /** Optional real cover in /public; replaces the generated gradient. */
  image?: string;
}

export interface Milestone {
  text: string;
  name: string;
  detail: string;
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
    name: "Arsene Ishimwe Uganase",
    initials: "IA",
    wordmark: "Ishimwe A", // footer ghost wordmark
    role: "Software Engineer",
    tagline: "Building software from Kigali.",
    location: "Kigali, Rwanda",
    timezoneLabel: "Kigali",
    timezone: "Africa/Kigali",
    availability: "Building KinyaSearch",
    email: "ishimwearsene11@gmail.com",
    portrait: "/portrait.jpeg",
    metaTitle: "Arsene Ishimwe Uganase — Software Engineer, Kigali",
    metaDescription:
      "Full-stack and DevOps engineer in Kigali, Rwanda. Lead developer of ICCA's CTF platform, building KinyaSearch, a search engine that understands Kinyarwanda.",
  },

  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Get in touch", href: "#contact" },
  },

  hero: {
    eyebrow: "Portfolio — 2026",
    headline: ["Building software", "from Kigali."],
    subline:
      "Full-stack developer and cybersecurity competitor. I build backends, keep the servers under them running, and right now I'm teaching a search engine to understand Kinyarwanda.",
    scrollCue: "Scroll",
  },

  about: {
    eyebrow: "About",
    heading: "I build things, then test how they break.",
    paragraphs: [
      "I like understanding how things work, and how they fail. That curiosity took me from the classrooms of Rwanda Coding Academy to production servers, cybersecurity competitions, and a search engine for my own language.",
      "I studied software engineering and embedded systems at Rwanda Coding Academy. Since graduating in 2025, I have interned at TV1 Rwanda and Potter's Hand Ministries, joined STARONLY Rwanda as a full-stack and DevOps engineer, and helped found the International Cybersecurity Community for Africa, where I lead development of its CTF platform. I write down every step I take on a server, because what worked today has to work again tomorrow.",
    ],
    stats: [
      { value: 1, suffix: "st", label: "Cyberlympics Africa 2025, as team captain" },
      { value: 60, suffix: "", label: "Students practicing on the CTF platform I lead" },
      { value: 2, suffix: "", label: "Official competitions hosted on that platform" },
    ] as Stat[],
    experience: [
      {
        role: "Full-Stack & DevOps Engineer",
        company: "STARONLY Rwanda",
        period: "2026 — Now",
        note: "AhwiiX, an Enterprise Resource Planning (ERP) platform for small businesses. I build modules end to end and run the servers.",
      },
      {
        role: "Founding Member · Lead CTF Platform Developer",
        company: "ICCA",
        period: "2025 — Now",
        note: "International Cybersecurity Community for Africa, launched in Kigali in March 2026.",
      },
      {
        role: "Software Development Intern",
        company: "TV1 Rwanda · Potter's Hand Ministries",
        period: "2025 — 2026",
        note: "Mobile booking, order and payment flows; a devotional app now on both app stores.",
      },
      {
        role: "Student, Software Engineering & Embedded Systems",
        company: "Rwanda Coding Academy",
        period: "2022 — 2025",
        note: "Class representative. Captained our CTF teams.",
      },
    ] as Experience[],
  },

  work: {
    eyebrow: "Selected Work",
    heading: "What I've built, and where it stands.",
    projects: [
      {
        slug: "kinyasearch",
        title: "KinyaSearch",
        tagline: "Search that understands Kinyarwanda",
        description:
          "Kinyarwanda builds words by attaching pieces to a root, so umuntu, abantu and ubuntu look unrelated to a normal search engine. KinyaSearch reduces every word to its root, matches on roots, and shows why each result matched. I'm starting with Rwandan law, where a missed word form means a missed provision.",
        year: "2026 — Now",
        role: "Solo · Design & engineering",
        status: "In progress",
        stack: ["Information retrieval", "Inverted index", "BM25 ranking", "Morphology"],
        outcome: "One query finds every form of a word that exact-match search misses, shown side by side.",
        links: [],
        linkNote: "Code private while in development",
        hue: 18,
      },
      {
        slug: "ahwiix",
        title: "AhwiiX",
        tagline: "A business system where the books keep themselves",
        description:
          "AhwiiX is STARONLY Rwanda's ERP for small businesses: sales, stock, accounting, payroll and HR on one platform, built for Rwanda with RWF, VAT and mobile-money payments. Every sale rung up at the counter posts its own journal entry and updates stock. I build its modules end to end and run the servers it lives on.",
        year: "2026 — Now",
        role: "Full-stack & DevOps engineer · STARONLY Rwanda",
        status: "Live",
        stack: ["Next.js", "NestJS", "Accounting", "Inventory", "Mobile money"],
        outcome: "10+ businesses running on it: hardware shops, salons, rental stores, cooperatives",
        links: [{ label: "ahwiix.com", href: "https://ahwiix.com/" }],
        hue: 250,
      },
      {
        slug: "icca-ctf",
        title: "ICCA CTF Platform",
        tagline: "A practice ground for Africa's security students",
        description:
          "The Capture The Flag platform of the International Cybersecurity Community for Africa. I lead its development, with help from a colleague: team accounts, challenge hosting, dynamic flags unique to each team, and the live scoreboard.",
        year: "2025 — Now",
        role: "Lead developer",
        status: "Live",
        stack: ["CTF platform", "Dynamic per-team flags", "Live scoreboard"],
        outcome: "About 60 students · 2 official competitions hosted",
        links: [{ label: "ctf.icca.africa", href: "https://ctf.icca.africa" }],
        hue: 205,
      },
      {
        slug: "phm-app",
        title: "PHM Devotional",
        tagline: "Daily devotions, published on both app stores",
        description:
          "A devotional app for Potter's Hand Ministries: daily devotions, Bible studies, verses and prayer requests, with a website and an admin portal behind it. I contributed to the app as a software development intern.",
        year: "2025 — 2026",
        role: "Software development intern",
        status: "Live",
        stack: ["Mobile app", "Website", "Admin portal"],
        outcome: "Published on the App Store and Google Play",
        links: [
          { label: "App Store", href: "https://apps.apple.com/us/app/phm-devotional/id6759655365" },
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.pottershandministries.phmapp",
          },
          { label: "phm.rw", href: "https://phm.rw/" },
        ],
        hue: 150,
      },
      {
        slug: "veritas",
        title: "Veritas",
        tagline: "Proving the rules in a spreadsheet",
        description:
          "Spreadsheets drive real money decisions, and most tools only flag cells that look suspicious. In Veritas, you write a rule into the sheet, like \"this total equals the sum of these rows,\" and it either proves the rule holds for every valid input or returns the exact values that break it.",
        year: "2026",
        role: "Solo · Design & engineering",
        status: "In progress",
        stack: ["Formal verification", "Z3 (WASM)", "SMT-LIB", "Spreadsheets"],
        outcome: "Full pipeline implemented and tested: a proof, or a concrete counterexample.",
        links: [],
        linkNote: "Code private while I keep improving it",
        hue: 330,
      },
      {
        slug: "guard",
        title: "GUARD",
        tagline: "Emergency braking, tested on the bench",
        description:
          "Guardian Utility for Automotive Roadway Defense: a road-safety prototype that uses an ESP32-CAM and sensors to decide when a vehicle should brake. We built and tested it on a bench rig with an Arduino, servo motors and sensors, not on a real car.",
        year: "2024",
        role: "Team member · System logic",
        status: "Prototype",
        stack: ["ESP32-CAM", "Arduino", "C", "Sensors & servos"],
        outcome: "Bench-tested prototype · school hackathon project",
        // TODO: add the public GitHub repo, e.g. { label: "GitHub", href: "https://github.com/arseneishimwe11/..." }
        links: [],
        linkNote: "Hardware prototype",
        hue: 45,
      },
    ] as Project[],
  },

  skills: {
    eyebrow: "Capabilities",
    heading: "What I work with.",
    bento: [
      {
        title: "Backend & APIs",
        body: "Where I spend most of my time: the modules, data models and APIs the rest of a product depends on.",
        items: ["NestJS", "Node.js", "TypeScript", "PostgreSQL"],
        size: "wide",
      },
      {
        title: "Web & mobile",
        body: "Interfaces for the people who actually use the system.",
        items: ["Next.js", "React", "React Native / Expo"],
        size: "normal",
      },
      {
        title: "Servers & DevOps",
        body: "Setting up and running the machines underneath, and writing down every step.",
        items: ["Linux", "Nginx", "Docker", "SSL/TLS"],
        size: "normal",
      },
      {
        title: "Cybersecurity",
        body: "CTF competitor and team captain, ISC2 Certified in Cybersecurity. I like knowing how things break.",
        items: ["CTFs", "Web exploitation", "ISC2 CC"],
        size: "wide",
      },
      {
        title: "Currently exploring",
        body: "Information retrieval for languages the big tools ignore: inverted indexes, ranking, and how to teach a search engine Kinyarwanda morphology.",
        size: "wide",
      },
    ] as BentoTile[],
    marquee: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "Next.js",
      "React",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Linux",
      "Socket.IO",
      "ESP32",
      "Git",
    ],
    process: [
      {
        number: "01",
        title: "Understand",
        body: "Before writing code, I want to know who it's for and what failure would look like.",
      },
      {
        number: "02",
        title: "Build small",
        body: "The smallest version that actually works, then improve it with real feedback.",
      },
      {
        number: "03",
        title: "Try to break it",
        body: "I test it the way an attacker would, or the way a tired user would.",
      },
      {
        number: "04",
        title: "Write it down",
        body: "Every setup, every fix, every command. A result I can't reproduce isn't finished.",
      },
    ] as ProcessStep[],
  },

  recognition: {
    eyebrow: "Recognition",
    heading: "Milestones, so far.",
    items: [
      {
        text: "First place at Cyberlympics Africa 2025 as team captain, a year after our team took bronze.",
        name: "Cyberlympics Africa",
        detail: "2025 · 1st place  ·  2024 · 3rd place",
      },
      {
        text: "Certified in Cybersecurity (CC) by ISC2, the global body behind the CISSP.",
        name: "ISC2",
        detail: "June 2026",
      },
      {
        text: "One of the founders of the International Cybersecurity Community for Africa, launched in Kigali in March 2026.",
        name: "ICCA",
        detail: "Founding member · 2025 — Now",
      },
    ] as Milestone[],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions, answered.",
    items: [
      {
        q: "What are you working on right now?",
        a: "Full-time at STARONLY Rwanda on Enterprise Resource Planning (ERP) software for small businesses, the CTF platform for the International Cybersecurity Community for Africa, and KinyaSearch, my search engine for Kinyarwanda.",
      },
      {
        q: "Why build a search engine for Kinyarwanda?",
        a: "Because normal search breaks on it. My father once searched for a government document that was online, in Kinyarwanda, and never found it: he typed the right word in the wrong form. Kinyarwanda changes the shape of words so much that exact-match search quietly misses relevant results.",
      },
      {
        q: "Why is some of your code private?",
        a: "Some projects are client work that belongs to the companies I built it for, like Rex Plus at TV1 Rwanda. Others, like KinyaSearch, are still in development. Where I can, I link to the live product instead.",
      },
      {
        q: "Do you work alone or in a team?",
        a: "Both. KinyaSearch is a solo project. GUARD, the CTF platform and my internship work were team efforts, and I have captained CTF teams in competition.",
      },
      {
        q: "What do you want to study next?",
        a: "Computer science, with a focus on software engineering and security: how to build systems that still hold up when someone tries to break them.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    headline: ["Get in", "touch."],
    body: "Questions about my work, KinyaSearch, or CTFs? Email is the fastest way to reach me.",
    socials: [
      { label: "GitHub", href: "https://github.com/arseneishimwe11" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ishimwe-arsene-08a301256/" },
      { label: "ICCA CTF", href: "https://ctf.icca.africa" },
    ],
  },

  footer: {
    colophon: "Designed & built by Ishimwe Arsene",
    note: "Next.js · Tailwind · GSAP · Lenis · R3F",
  },
} as const;

export type SiteData = typeof siteData;
