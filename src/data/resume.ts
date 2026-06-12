export const profile = {
  name: "Ivan Kostiashov",
  handle: "ololonly",
  role: "Senior Fullstack Engineer",
  tagline: ".NET / React · Azure · Clean Architecture · AI Tooling",
  location: "Antalya, Türkiye",
  // rotating words for the hero typewriter
  roles: [
    "Senior Fullstack Engineer",
    ".NET & Azure specialist",
    "Clean Architecture practitioner",
    "Enterprise integration engineer",
    "Home-lab tinkerer",
  ],
  resumeUrl: "", // optional: link to a PDF if you add one to /public
};

export const about = {
  lines: [
    "Senior Fullstack Engineer with 8 years in enterprise integrations and cloud-native systems on .NET and Azure.",
    "For 4 years at EPAM I've been building a VSTO add-in for Microsoft Project — part of a drug-certification workflow used globally by a Top-5 pharmaceutical company.",
    "The add-in integrates with Dynamics 365 Planner Premium via the PSS Schedule API and Dataverse, with background processing on Azure: Functions, Service Bus, web services.",
    "I use AI tooling in daily work — Claude Code with custom sub-agent workflows, Cursor, GitHub Copilot. Not as productivity theatre, but as the actual way I work through unfamiliar codebases and integration problems.",
  ],
  facts: [
    ["uptime", "8 years in production"],
    ["base", "Antalya, Türkiye"],
    ["focus", ".NET 8 · Azure · React/TS"],
    ["fuel", "espresso (self-hosted)"],
  ] as [string, string][],
};

export type Skill = { name: string; slug?: string };
export type SkillGroup = { label: string; cmd: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "languages",
    cmd: "ls ~/languages",
    items: [
      { name: "C#", slug: "csharp" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "SQL" },
      { name: "Rust", slug: "rust" },
    ],
  },
  {
    label: "backend",
    cmd: "ls ~/backend",
    items: [
      { name: ".NET 8", slug: "dotnet" },
      { name: "ASP.NET Core", slug: "dotnet" },
      { name: "EF Core", slug: "dotnet" },
      { name: "VSTO" },
      { name: "WCF / Web API" },
      { name: "gRPC" },
    ],
  },
  {
    label: "frontend",
    cmd: "ls ~/frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Vite", slug: "vite" },
      { name: "Tailwind", slug: "tailwindcss" },
    ],
  },
  {
    label: "cloud & data",
    cmd: "ls ~/cloud",
    items: [
      { name: "Azure", slug: "azure" },
      { name: "Azure Functions", slug: "azure" },
      { name: "Service Bus", slug: "azure" },
      { name: "App Insights", slug: "azure" },
      { name: "Dynamics 365 / Dataverse" },
      { name: "SQL Server", slug: "microsoftsqlserver" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Kafka", slug: "apachekafka" },
    ],
  },
  {
    label: "ops & ai",
    cmd: "ls ~/ops",
    items: [
      { name: "Azure DevOps", slug: "azuredevops" },
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { name: "Claude Code", slug: "anthropic" },
      { name: "Cursor" },
      { name: "GitHub Copilot", slug: "github" },
    ],
  },
];

export type Job = {
  role: string;
  company: string;
  kind: string;
  period: string;
  location: string;
  bullets: string[];
  stack?: string;
  /** fake 7-char commit hash for the `git log` rendering of Experience */
  hash: string;
};

export const experience: Job[] = [
  {
    role: "Senior Software Engineer",
    company: "EPAM Systems",
    kind: "Full-time",
    period: "May 2022 — Present",
    location: "Antalya, Türkiye",
    hash: "f3a9c1e",
    bullets: [
      "Building a VSTO add-in for Microsoft Project — internal apps portfolio for a world Top-5 pharmaceutical company.",
      "Migrated backend & shared components from .NET Framework to .NET 8 (multi-target where VSTO required), adopting Clean Architecture.",
      "Built the integration layer between MS Project and Dynamics 365 Planner Premium via PSS Schedule API & Dataverse, handling async OperationSet lifecycle.",
      "Implemented structured logging from on-prem to Azure Application Insights — end-to-end request tracing across hybrid infrastructure.",
      "Set up CI/CD pipelines for on-prem and Azure deployments via Azure DevOps.",
      "Integrated AI-assisted workflows into daily development: review, refactoring, integration research, and sub-agent automation via Claude Code.",
    ],
    stack:
      "C# · .NET 8 / .NET Framework · VSTO · MS SQL · Azure Functions · Service Bus · Azure DevOps · App Insights · Dynamics 365 / Dataverse",
  },
  {
    role: "Software Architect / Senior Developer",
    company: "Klever Label",
    kind: "Freelance",
    period: "May 2020 — Apr 2022",
    location: "Moscow, Russia",
    hash: "b7d4e02",
    bullets: [
      "Designed and built a self-written CRM for a music label as both architect and developer.",
      "Designed the PostgreSQL schema and the ASP.NET Core + EF Core data-access layer.",
      "Built ingestion of music-stream data from third-party services with a flexible self-written import model (incl. Google Sheets migration).",
      "Created financial accounting and client reporting. The CRM now processes 100M+ streams every quarter.",
      "Provisioned a pool of Ubuntu servers and internal network for deployment.",
    ],
    stack: "ASP.NET Core · PostgreSQL · Entity Framework · Vanilla JS + jQuery",
  },
  {
    role: "Full Stack Engineer",
    company: "FINAM",
    kind: "Full-time",
    period: "Feb 2020 — Apr 2022",
    location: "Moscow, Russia",
    hash: "9c2f681",
    bullets: [
      "Microsoft Dynamics CRM 2016 on-premises development and customization.",
      "Integrated a recommendation system that increased managers' call efficiency by 40%.",
      "Developed 20+ custom UI web apps with ASP.NET and ReactJS.",
      "Built integration schemas with SoniqMQ, Kafka, gRPC, REST API and MS SQL.",
      "Built SMS / email / push distribution for stock events — 100,000+ messages weekly.",
    ],
    stack: "C# · ASP.NET · ReactJS · Dynamics CRM · Kafka · gRPC · MS SQL",
  },
  {
    role: "Junior Software Engineer",
    company: "VTB 24 Leasing",
    kind: "Full-time",
    period: "Aug 2018 — Feb 2020",
    location: "Moscow, Russia",
    hash: "5e0a3f8",
    bullets: [
      "Microsoft Dynamics CRM 2016 on-premises development.",
      "Introduced ReactJS into the company's tech stack; migrated UI from ActiveX to React.",
      "Implemented risk-scoring system integration and designed web app architectures.",
    ],
    stack: "C# · Dynamics CRM · ReactJS · WCF / Web API · Windows Server",
  },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  url: string;
  stars?: number;
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    name: "maratui",
    description:
      "Rust TUI for the Lelit Mara espresso machine running on ESP32. Streams telemetry to MQTT, built with Ratatui.",
    stack: ["Rust", "Ratatui", "ESP32", "MQTT"],
    url: "https://github.com/ololonly/maratui",
    stars: 20,
    highlight: true,
  },
];

export type Cert = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
};

export const certs: Cert[] = [
  {
    name: "Claude Certified Architect — Foundations (Early Adopter)",
    issuer: "Anthropic",
    date: "Apr 2026",
    credentialId: "m2t8q3psw7yc",
  },
  {
    name: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    date: "Apr 2026",
    credentialId: "w7muq7ztwuoa",
  },
];

export const education = {
  school: "Moscow Technical University of Communications and Informatics (MTUCI)",
  degree: "Bachelor's — Computer & Information Systems Security / Data Protection",
  period: "2014 — 2018",
};

export const social = {
  github: "https://github.com/ololonly",
  linkedin: "https://www.linkedin.com/in/ivan-kostiashov-696900137/",
  telegram: "https://t.me/ololonly",
  email: "iam@waytoo.dev",
};

export type NavSection = { id: string; label: string };

export const navSections: NavSection[] = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "credentials", label: "credentials" },
  { id: "contact", label: "contact" },
];
