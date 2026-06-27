// Source of truth for the Daedalus portfolio.
// NOTE: The YC defense-startup offensive-security internship is under NDA and is
// intentionally omitted everywhere. Do not add it.

export type Tag = { label: string; kind: "security" | "neutral" };
export type ArtifactImage = { src: string; fit: "cover" | "contain"; caption?: string };

export const profile = {
  name: "Yousif Nazhat",
  role: "Offensive Security Engineer",
  tagline: "Maker of tools, breaker of trust boundaries.",
  wallText:
    "A working museum of systems built — and systems broken. Red-team tradecraft, security tooling, and high-reliability hardware, kept under one roof.",
  status: "Available · 2026",
  location: "New Brunswick, NJ",
  contact: {
    email: "yousif.snazhat@gmail.com",
    phone: "(973) 382-5159",
    github: "https://github.com/yousifnazhat",
    linkedin: "https://www.linkedin.com/in/yousif-nazhat-526027296",
  },
};

export const stats: { n: string; k: string }[] = [
  { n: "1,000+", k: "Auth attempts captured" },
  { n: "78", k: "Server assets de-risked" },
  { n: "50+", k: "Members trained" },
  { n: "0", k: "Critical failures" },
];

export type Artifact = {
  id: string;
  no: string;
  category: string;
  title: string;
  medium: string;
  blurb: string;
  longDescription: string;
  tags: Tag[];
  year: string;
  t: number;
  images: ArtifactImage[];
  image?: string;
  href?: string;
};

// "The Collection" — the headline exhibits.
export const collection: Artifact[] = [
  {
    id: "penpal",
    no: "No. 01",
    category: "Tooling",
    title: "PenPal",
    medium: "Python · authorized enumeration assistant",
    year: "2026",
    t: 5,
    images: [],
    blurb:
      "A modular assistant for authorized pentesting — automated workspaces, dry-run scan plans, evidence ingestion, and deterministic, methodology-driven recommendations.",
    longDescription:
      "Open-sourced PenPal: a modular Python assistant for authorized pentesting that automates target workspaces, dry-run scan plans, XML/evidence ingestion, masked parameters, deterministic recommendations and a local JSON-API report. Operationalized MITRE ATT&CK, OWASP, NIST, HTB Academy and OffSec guidance into repeatable playbooks — validated through an automated methodology pipeline (55 methodology files, 21 PenPal-ready files, 21 evidence-rule blocks, 0 invalid blocks).",
    tags: [
      { label: "Python", kind: "neutral" },
      { label: "MITRE ATT&CK", kind: "security" },
      { label: "OWASP", kind: "security" },
      { label: "Open Source", kind: "neutral" },
    ],
    href: "https://github.com/yousifnazhat",
  },
  {
    id: "attack-detection-labs",
    no: "No. 02",
    category: "Red Team",
    title: "Attack & Detection Labs",
    medium: "Active Directory · credential chaining · ELK",
    year: "2025–26",
    t: 3,
    images: [{ src: "/images/attack-detection/architecture-diagram.svg", fit: "contain" }],
    blurb:
      "Full credential chains across Windows, Linux and AD — then 1,000+ captured auth events turned into ELK detection dashboards.",
    longDescription:
      "Completed enterprise credential chains across Windows, Linux and Active Directory — validated SAM/LSA/LSASS extraction, NTDS.dit dumping, Kerberos ticket import, Pass-the-Hash, SMB credential chaining and WinRM access via password-attack, credential-dumping, ticketing, access-validation and lateral-movement workflows. Captured 1,000+ authentication attempts with honeypot telemetry and transformed the events into ELK security-analytics dashboards, identifying reconnaissance and brute-force patterns.",
    tags: [
      { label: "Kerberos/NTLM", kind: "security" },
      { label: "Active Directory", kind: "security" },
      { label: "ELK", kind: "neutral" },
      { label: "Honeypot", kind: "security" },
    ],
    image: "/honeypot-lab-diagram.svg",
    href: "#collection",
  },
  {
    id: "mu-sigma",
    no: "No. 03",
    category: "Full-Stack",
    title: "Mu Sigma Alumni Platform",
    medium: "Next.js · Stripe · Supabase · Vercel",
    year: "2025",
    t: 2,
    images: [],
    blurb:
      "A deployed alumni platform — 10 pages, 3 server APIs, idempotent Stripe webhooks across 6 event types, server-side secret isolation and donor-privacy controls.",
    longDescription:
      "Architected and deployed a full-stack alumni platform spanning 10 public pages and 3 server APIs — enabling one-time and monthly donations and live reporting by integrating Stripe Checkout, signed and idempotent webhooks across 6 event types, Supabase persistence, server-side secret isolation, and opt-in donor-privacy controls.",
    tags: [
      { label: "Next.js", kind: "neutral" },
      { label: "TypeScript", kind: "neutral" },
      { label: "Stripe", kind: "neutral" },
      { label: "Supabase", kind: "neutral" },
    ],
    href: "https://github.com/yousifnazhat",
  },
  {
    id: "project-daedalus",
    no: "No. 04",
    category: "Hardware",
    title: "Project Daedalus",
    medium: "Avionics · NASA & Lockheed Martin",
    year: "2025",
    t: 1,
    images: [
      {
        src: "/images/daedalus/plane.jpg",
        fit: "cover",
        caption:
          "The Daedalus UAV airframe — Rutgers Airborne, sponsored by NASA & Lockheed Martin. I led integration of the interconnected avionics subsystems mounted inside this build.",
      },
      {
        src: "/images/daedalus/thrust-stand.jpg",
        fit: "cover",
        caption:
          "Our custom propulsion thrust stand. We bench-tested the powertrain here to validate the 1.46 thrust-to-weight ratio against the simulation before flight.",
      },
      {
        src: "/images/daedalus/ecalc-data.jpg",
        fit: "contain",
        caption:
          "eCalc propulsion modeling — the predictive baseline (motor, prop, battery, cruise) we tuned the real powertrain against to hit the target flight envelope.",
      },
    ],
    blurb:
      "Design-team lead on a sponsored UAV — avionics integrated to 100% interface compliance with zero critical failures at 130A peak current.",
    longDescription:
      "Directed integration of interconnected avionics subsystems on a UAV sponsored by NASA and Lockheed Martin, applying rigorous interface validation to ensure 100% compliance with strict safety and reliability standards. Delivered a fully integrated system within a 5-week timeline by coordinating cross-functional Aerodynamics and Manufacturing teams — optimizing propulsion to a 1.46 thrust-to-weight ratio with zero critical failures during 130A peak-current operations.",
    tags: [
      { label: "Embedded", kind: "neutral" },
      { label: "C/C++", kind: "neutral" },
      { label: "RISC-V", kind: "neutral" },
      { label: "Integration", kind: "neutral" },
    ],
    image: "/hero-plane.jpg",
    href: "#collection",
  },
  {
    id: "risc-v-simulator",
    no: "No. 05",
    category: "Architecture",
    title: "RISC-V Pipeline Simulator",
    medium: "C · cycle-accurate 5-stage pipeline",
    year: "2026",
    t: 4,
    images: [{ src: "/riscv-pipeline-diagram.svg", fit: "contain" }],
    blurb:
      "A cycle-accurate, 5-stage pipelined RISC-V processor with a configurable set-associative cache — 100% execution fidelity across the RV64I subset.",
    longDescription:
      "A complete simulation of a pipelined RISC-V processor, faithfully modeling execution of an RV64I subset. Five classic stages — Fetch, Decode, Execute, Memory, Writeback — drive a set-associative cache (64-byte blocks, configurable associativity, LRU eviction, write-back with dirty bits). Cycle-accurate timing and realistic memory latency yield 100% execution fidelity for memory and arithmetic operations.",
    tags: [
      { label: "C", kind: "neutral" },
      { label: "Computer Architecture", kind: "neutral" },
      { label: "Cache", kind: "neutral" },
      { label: "RV64I", kind: "neutral" },
    ],
    image: "/riscv-pipeline-diagram.svg",
  },
];

// "The Atelier" — roles & appointments.
export type Appointment = {
  role: string;
  org: string;
  period: string;
  location: string;
  kind: "security" | "hardware" | "leadership";
  bullets: string[];
};

export const atelier: Appointment[] = [
  {
    role: "Cloud Infrastructure & Security Intern",
    org: "Schindler Group",
    period: "Jun 2026 – Aug 2026",
    location: "Morristown, NJ",
    kind: "security",
    bullets: [
      "Strengthened internal AI security posture by implementing Microsoft Entra ID and Azure AI Foundry agentic identity controls across Azure, reducing privilege-escalation and unauthorized agent-to-agent access paths.",
      "Reduced end-of-support infrastructure risk across 78 server assets by analyzing dependencies and delivering remediation-ready architecture assessments with 100% coverage and prioritized migration actions.",
      "Secured an Azure LLM-integrated production server for Group Cyber Security review — scoping identity/SAS privileges, hardening workflows, and rebuilding patched configurations.",
    ],
  },
  {
    role: "Team Lead",
    org: "RU Cybersecurity",
    period: "Sep 2025 – Present",
    location: "New Brunswick, NJ",
    kind: "security",
    bullets: [
      "Improved technical competency for 50+ active members — a 30% increase in project participation — by spearheading workshops on Red/Blue Team operations, SIEM, and Linux fundamentals.",
      "Strengthened incident-response skills through the successful execution of 4 simulated cyber-defense exercises, leading infrastructure-hardening and threat-mitigation workshops.",
    ],
  },
  {
    role: "Design Team Lead",
    org: "RU Airborne, Avionics & Integration",
    period: "Jan 2025 – Present",
    location: "New Brunswick, NJ",
    kind: "hardware",
    bullets: [
      "Directed integration of interconnected avionics subsystems on a UAV sponsored by NASA and Lockheed Martin — 100% compliance with strict safety and reliability standards.",
      "Delivered a fully integrated system within a strict 5-week timeline by coordinating cross-functional Aerodynamics and Manufacturing teams.",
    ],
  },
  {
    role: "Alumni Relations Chair",
    org: "Phi Mu Delta Fraternity",
    period: "Jan 2024 – Present",
    location: "New Brunswick, NJ",
    kind: "leadership",
    bullets: [
      "Surpassed fundraising targets by 625% for the Embrace Kids Foundation, securing sponsorships from 32 local organizations.",
    ],
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Offensive Methodology",
    items: [
      "Footprinting & Enumeration",
      "Vulnerability Assessment",
      "Password Attacks",
      "Credential Chaining",
      "Lateral Movement",
      "AD Attack Paths",
    ],
  },
  {
    title: "Auth & Windows Internals",
    items: [
      "Kerberos / NTLM",
      "SMB / WinRM / RDP",
      "NTDS.dit",
      "SAM / LSA / LSASS",
    ],
  },
  {
    title: "Detection & Tooling",
    items: [
      "Python Security Tooling",
      "Scan-Output Parsing",
      "SIEM / ELK Log Analysis",
    ],
  },
  {
    title: "Cloud & Identity",
    items: [
      "Microsoft Entra ID",
      "Azure AI Foundry",
      "Azure RBAC",
      "SAS Access Scoping",
      "Server Hardening",
    ],
  },
  {
    title: "Full-Stack",
    items: ["Next.js", "TypeScript", "React", "Supabase / PostgreSQL", "Stripe", "Vercel"],
  },
];

export const certifications = {
  inProgress: [
    "CompTIA Security+",
    "OffSec OSCP+",
    "HTB CPTS",
    "HTB COAE",
    "Microsoft SC-500",
  ],
  honors: ["Dean's List Recipient", "ISC2 NJ Chapter — Active Member"],
};

export const education = {
  school: "Rutgers University",
  degree: "B.S. Information Technology & Informatics",
  minor: "Minor in Critical Intelligence",
  graduation: "Expected May 2027",
  location: "New Brunswick, NJ",
};

// ---- Case studies (the deeper exhibit pages, keyed by Artifact.id) ----
export type CaseStudy = {
  year: string;
  role: string;
  github?: string;
  live?: string;
  overview: string;
  highlights: { label: string; detail: string }[];
  stack: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  penpal: {
    year: "2026",
    role: "Creator & maintainer",
    github: "https://github.com/yousifnazhat",
    overview:
      "PenPal is an open-source, methodology-driven assistant for authorized penetration testing. Instead of firing off ad-hoc commands, it scaffolds a clean engagement: per-target workspaces, dry-run scan plans you review before anything touches the wire, structured ingestion of XML and evidence, masked parameters, and deterministic, playbook-backed recommendations — all reportable through a local JSON API.",
    highlights: [
      { label: "Repeatable playbooks", detail: "Operationalized MITRE ATT&CK, OWASP, NIST, HTB Academy and OffSec guidance into deterministic, reviewable methodology blocks." },
      { label: "Validated pipeline", detail: "An automated methodology pipeline validated 55 methodology files, 21 PenPal-ready files, 21 evidence-rule blocks — and 0 invalid blocks." },
      { label: "Safe by design", detail: "Dry-run scan plans and masked parameters keep operators inside the rules of engagement before any action executes." },
      { label: "Structured evidence", detail: "XML / evidence ingestion and a local JSON-API report turn raw output into auditable findings." },
    ],
    stack: ["Python", "CLI", "JSON API", "MITRE ATT&CK", "OWASP", "NIST"],
  },
  "attack-detection-labs": {
    year: "2025–2026",
    role: "Red & blue team",
    overview:
      "A pair of enterprise labs that close the loop between offense and detection. On the red side: full credential chains across Windows, Linux and Active Directory. On the blue side: honeypot telemetry streamed into ELK, where the same attacker behaviors surface as detection signal.",
    highlights: [
      { label: "Credential chaining", detail: "Validated SAM/LSA/LSASS extraction, NTDS.dit dumping, Kerberos ticket import, Pass-the-Hash, SMB credential chaining and WinRM access." },
      { label: "End-to-end workflows", detail: "Executed password-attack, credential-dumping, ticketing, access-validation and lateral-movement workflows against a domain." },
      { label: "1,000+ events captured", detail: "Deployed honeypot telemetry and captured 1,000+ authentication attempts for analysis." },
      { label: "Detection dashboards", detail: "Transformed events into ELK security-analytics dashboards, identifying reconnaissance and brute-force patterns." },
    ],
    stack: ["Active Directory", "Kerberos / NTLM", "Credential Dumping", "ELK", "Honeypot Telemetry"],
  },
  "mu-sigma": {
    year: "2025",
    role: "Architect & full-stack engineer",
    github: "https://github.com/yousifnazhat",
    live: "https://musigmaalumni.vercel.app/",
    overview:
      "A production alumni platform for the Phi Mu Delta Mu Sigma chapter — donations, live reporting, and donor privacy, built with a security-first posture. Money movement is handled through Stripe with idempotent, signed webhooks; secrets never leave the server.",
    highlights: [
      { label: "10 pages, 3 server APIs", detail: "A full public site plus server endpoints powering donations and live reporting." },
      { label: "Idempotent payments", detail: "Stripe Checkout for one-time and monthly gifts, with signed and idempotent webhooks across 6 event types." },
      { label: "Secret isolation", detail: "Server-side secret isolation so keys and tokens never reach the client." },
      { label: "Privacy controls", detail: "Opt-in donor-privacy controls and Supabase persistence for reporting." },
    ],
    stack: ["Next.js", "TypeScript", "React", "Supabase / PostgreSQL", "Stripe", "Vercel"],
  },
  "project-daedalus": {
    year: "2025",
    role: "Avionics design-team lead",
    overview:
      "Project Daedalus is a NASA- and Lockheed-Martin-sponsored UAV. As avionics & integration lead, I directed the integration of interconnected subsystems under strict safety and reliability standards — the hardware counterpart to the rest of this museum, where a single failed interface is not an option.",
    highlights: [
      { label: "100% interface compliance", detail: "Rigorous interface validation ensured full compliance with strict safety and reliability standards." },
      { label: "5-week integration", detail: "Delivered a fully integrated system within a strict window by coordinating Aerodynamics and Manufacturing teams." },
      { label: "1.46 thrust-to-weight", detail: "Optimized propulsion to a 1.46 T/W ratio for the target flight envelope." },
      { label: "Zero critical failures", detail: "No critical failures during 130A peak-current flight operations." },
    ],
    stack: ["Embedded C/C++", "RISC-V", "Avionics Integration", "Systems Validation"],
  },
  "risc-v-simulator": {
    year: "2026",
    role: "Author",
    github: "https://github.com/yousifnazhat/riscv-pipeline-simulator",
    overview:
      "A cycle-accurate simulation of a pipelined RISC-V processor, written in C. It models a subset of the RV64I ISA across the five classic pipeline stages and pairs the datapath with a configurable set-associative cache — turning the textbook diagram into a running, testable machine.",
    highlights: [
      { label: "5-stage pipeline", detail: "Fetch, Decode, Execute, Memory and Writeback, each modeled as a discrete stage with accurate timing." },
      { label: "RV64I core ISA", detail: "Arithmetic, logical, memory (LD/SD), branch (BEQ/BNE/BLT…), and jump (JAL/JALR) instructions, plus limited ECALL." },
      { label: "Set-associative cache", detail: "64-byte blocks, configurable associativity, LRU eviction, and write-back with dirty bits — plus hit/miss statistics." },
      { label: "100% fidelity", detail: "Cycle-accurate timing and realistic memory latency give full execution fidelity for memory and arithmetic operations." },
    ],
    stack: ["C", "Makefile", "RISC-V RV64I", "Set-Associative Cache", "Computer Architecture"],
  },
};

// ---- Gilded Atelier additions ----
export const navItems = [
  { n: "01", label: "The Collection", href: "#collection" },
  { n: "02", label: "The Atelier", href: "#atelier" },
  { n: "03", label: "The Stack", href: "#arsenal" },
  { n: "04", label: "Contact", href: "#contact" },
];

export const marquee = [
  "Red Team",
  "Active Directory",
  "Credential Chaining",
  "Kerberos / NTLM",
  "ELK Detection",
  "Azure Identity",
  "Avionics Integration",
  "Full-Stack",
];

export const counters = [
  { v: 1000, suffix: "+", k: "Auth attempts captured" },
  { v: 78, suffix: "", k: "Server assets de-risked" },
  { v: 50, suffix: "+", k: "Members trained" },
  { v: 0, suffix: "", k: "Critical failures" },
];

export type TechItem = { name: string; slug: string | null; glyph: string | null };
const icon = (name: string, slug: string): TechItem => ({ name, slug, glyph: null });
const glyph = (name: string, g: string): TechItem => ({ name, slug: null, glyph: g });

export const stack: { title: string; items: TechItem[] }[] = [
  {
    title: "Languages",
    items: [icon("Python", "python"), icon("TypeScript", "typescript"), icon("JavaScript", "javascript"), icon("C++", "cplusplus"), icon("PHP", "php")],
  },
  {
    title: "Offensive & Security",
    items: [icon("Metasploit", "metasploit"), glyph("msfvenom", "msf"), icon("Kali Linux", "kalilinux"), icon("Wireshark", "wireshark"), icon("Burp Suite", "burpsuite")],
  },
  {
    title: "ML & Frameworks",
    items: [icon("PyTorch", "pytorch"), icon("React", "react"), icon("Next.js", "nextdotjs"), icon("Node.js", "nodedotjs")],
  },
  {
    title: "Cloud & DevOps",
    items: [icon("Docker", "docker"), glyph("Azure", "Az"), icon("Vercel", "vercel"), icon("Git", "git"), icon("Linux", "linux")],
  },
  {
    title: "Data & Detection",
    items: [icon("PostgreSQL", "postgresql"), icon("Supabase", "supabase"), icon("Elastic / ELK", "elasticsearch"), icon("Stripe", "stripe")],
  },
];

export const credentials = [
  { title: "Certifications · In Progress", items: ["CompTIA Security+", "OffSec OSCP+", "HTB CPTS", "HTB COAE", "Microsoft SC-500"] },
  { title: "Honors", items: ["Dean's List Recipient", "ISC2 NJ Chapter — Member"] },
  { title: "Education", items: ["B.S. IT & Informatics", "Minor in Critical Intelligence", "Rutgers · Expected May 2027"] },
];
