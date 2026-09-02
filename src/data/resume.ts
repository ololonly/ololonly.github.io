export const profile = {
  name: "Ivan Kostiashov",
  handle: "ololonly",
  role: "Senior TypeScript Fullstack Engineer",
  tagline:
    "TypeScript / React / Node.js · SPFx · Azure Functions · GitHub Actions · AI Tooling",
  location: "Antalya, Türkiye",
  // rotating words for the hero typewriter
  roles: [
    "Senior TypeScript Fullstack Engineer",
    "React / SPFx & Node.js developer",
    "GitHub Actions & DevOps enabler",
    "ex-.NET enterprise integrator",
    "Home-lab tinkerer",
  ],
  resumeUrl: "", // optional: link to a PDF if you add one to /public
};

export const about = {
  lines: [
    "Senior TypeScript Fullstack Engineer with 8 years in enterprise systems — now fully on TypeScript across the stack, after 4 years of C#/.NET before that.",
    "At EPAM I'm building an enterprise IT-asset management portal for a world Top-5 pharmaceutical company: a library of SPFx components on React/TypeScript on the front, Azure Functions on Node.js on the back.",
    "I also own DevOps for the team's move to GitHub Enterprise — repository migration, reusable CI/CD workflows for SPFx, Azure Functions and npm packages, release automation, commit linting, and a GitHub Copilot plugin with our team's context.",
    "ex-.NET: 4 years building a C#/VSTO add-in for Microsoft Project with Dynamics 365 / Dataverse integrations and Azure background processing, then a full switch to TypeScript.",
    "I use AI tooling in daily work — Claude Code with custom sub-agent workflows and GitHub Copilot with a custom team plugin. Not as productivity theatre, but as the actual way I work through unfamiliar codebases and integration problems.",
  ],
  facts: [
    ["uptime", "8 years in production"],
    ["base", "Antalya, Türkiye"],
    ["focus", "TypeScript · React/SPFx · Node.js · Azure Functions"],
    ["prev", "ex-.NET — 4 years of C#/VSTO"],
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
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "C# (ex)", slug: "csharp" },
      { name: "SQL" },
      { name: "Rust", slug: "rust" },
    ],
  },
  {
    label: "frontend",
    cmd: "ls ~/frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "SPFx (SharePoint Framework)" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Vite", slug: "vite" },
      { name: "Tailwind", slug: "tailwindcss" },
    ],
  },
  {
    label: "backend",
    cmd: "ls ~/backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Azure Functions", slug: "azure" },
      { name: "REST / Web API" },
      { name: "gRPC" },
    ],
  },
  {
    label: "ex-.net",
    cmd: "ls ~/archive/dotnet",
    items: [
      { name: ".NET 8", slug: "dotnet" },
      { name: "ASP.NET Core", slug: "dotnet" },
      { name: "EF Core", slug: "dotnet" },
      { name: "VSTO" },
      { name: "WCF" },
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
    label: "devops",
    cmd: "ls ~/devops",
    items: [
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "GitHub Enterprise", slug: "github" },
      { name: "JFrog Artifactory", slug: "jfrog" },
      { name: "Azure DevOps", slug: "azuredevops" },
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
    ],
  },
  {
    label: "ai",
    cmd: "ls ~/ai",
    items: [
      { name: "Claude Code", slug: "anthropic" },
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
    role: "Senior TypeScript Fullstack Engineer",
    company: "EPAM Systems",
    kind: "Full-time",
    period: "Jul 2026 — Present",
    location: "Antalya, Türkiye",
    hash: "a1c7e5d",
    bullets: [
      "Building an enterprise IT-asset management portal for a world Top-5 pharmaceutical company.",
      "Frontend: a library of SPFx components on React/TypeScript. Backend: Azure Functions on Node.js.",
      "Own DevOps for the team's migration to GitHub Enterprise — designed and rolled out the repository migration process.",
      "Built reusable GitHub Actions workflows for CI/CD: SPFx component build & deploy, Azure Functions deploy, and npm package publishing to JFrog Artifactory with automated versioning and release creation.",
      "Introduced commit linting across the team's repositories.",
      "Built a GitHub Copilot plugin that carries our team's working context; use Claude Code with custom sub-agent workflows daily.",
    ],
    stack:
      "TypeScript · React · SPFx · Node.js · Azure Functions · GitHub Actions · GitHub Enterprise · JFrog Artifactory",
  },
  {
    role: "Senior Software Engineer (.NET)",
    company: "EPAM Systems",
    kind: "Full-time · ex-.NET stage",
    period: "May 2022 — Jul 2026",
    location: "Antalya, Türkiye",
    hash: "f3a9c1e",
    bullets: [
      "4 years building a C#/VSTO add-in for Microsoft Project — internal apps portfolio for a world Top-5 pharmaceutical company — before a full switch to TypeScript.",
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
  /** public badge / verification URL */
  url?: string;
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
    url: "https://www.credly.com/badges/a2fdeb76-cc9c-4523-a9b5-77eb23350687/public_url",
  },
  {
    name: "Certified Partner Specialist — Gemini Enterprise Agent Development",
    issuer: "Google Cloud",
    date: "Jul 2026",
    url: "https://www.credly.com/badges/885a111c-b8b0-421c-bf41-caac265adf90/public_url",
  },
];

export const education = {
  school:
    "Moscow Technical University of Communications and Informatics (MTUCI)",
  degree:
    "Bachelor's — Computer & Information Systems Security / Data Protection",
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
