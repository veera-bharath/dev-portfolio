export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "tech", title: "Tech" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const services = [
  {
    title: "ASP.NET Core API + MVC",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
  },
  {
    title: "Angular Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg",
  },
  {
    title: "Windows Services",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/windows8/windows8-original.svg",
  },
  {
    title: "Clean Architecture",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg",
  },
];

export const technologies = [
  // Backend
  { name: "C#", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" },
  { name: "ASP.NET Core", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg" },
  { name: ".NET Core", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg" },
  { name: "Entity Framework", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  // Frontend
  { name: "Angular", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" },
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
  { name: "Bootstrap", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" },
  { name: "Electron", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/electron/electron-original.svg" },
  // Data & Cloud
  { name: "SQL Server", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
  { name: "Supabase", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" },
  { name: "Azure", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg" },
  // Tools
  { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
  { name: "Postman", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg" },
  { name: "Figma", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
  { name: "Jira", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg" },
];

export const experiences = [
  {
    title: "Full Stack Software Developer",
    company_name: "Nivi Software Solutions",
    date: "February 2022 - Present",
    points: [
      "Migrated legacy .NET Framework 4.8 MVC to .NET 9 applying Clean Architecture (Domain, Application, Infrastructure, Presentation) and SOLID principles across enterprise platforms.",
      "Engineered offline/online distributed mode with automatic bi-directional sync between SQL Server and IBM DB2 (iSeries AS400), ensuring zero data loss during connectivity outages.",
      "Integrated high-security external systems — Interpol, SITA Airport Management, APIS, and E-Gates — for real-time pre-arrival traveler verification at international borders.",
      "Built agentic AI workflows using Claude Code and GitHub Copilot for requirement analysis, code generation, code review, and work log automation — significantly boosting team productivity.",
      "Resolved Sigrid and AppScan findings, measurably improving maintainability and security scores across multiple production codebases.",
      "Delivered full-stack features using ASP.NET Core Web API, Angular 14+, EF Core, Windows Services, and third-party integrations (MRZ Scanner, FlightAPI, Google Maps, Airside Identity).",
      "Wrote SQL Server and IBM DB2 automation and reporting scripts from client requirements; resolved production incidents and guided junior developers through root cause analysis.",
    ],
  },
];

import projectTimesheet from '../assets/project_timesheet.png';
import projectHrms from '../assets/project_hrms.png';
import projectCli from '../assets/project_cli.png';
import projectBackup from '../assets/project_backup.png';

export const projects = [
  {
    name: "Timesheet Manager",
    description:
      "AI-powered Electron app for tracking weekly billable hours across Jira and Service Desk — natural language entry, smart suggestions, AI chat, and week summaries.",
    tags: [
      { name: "javascript", color: "text-[#00ffff]" },
      { name: "electron", color: "text-[#915eff]" },
      { name: "ai", color: "text-[#00ff00]" },
    ],
    image: projectTimesheet,
    source_code_link: "https://github.com/veera-bharath/Timesheet-Manager",
  },
  {
    name: "powertoys-cli",
    description:
      "A Windows PowerToys-inspired CLI toolkit built in Node.js — bulk file renaming with regex/templates, duplicate detection, and a plugin architecture for extensible system utilities.",
    tags: [
      { name: "nodejs", color: "text-[#00ff00]" },
      { name: "cli", color: "text-[#915eff]" },
      { name: "typescript", color: "text-[#00ffff]" },
    ],
    image: projectBackup,
    source_code_link: "https://github.com/veera-bharath/powertoys-cli",
  },
  {
    name: "iis-deploy-cli",
    description:
      "PowerShell CLI for deploying ASP.NET/IIS sites — auto-backup, rollback, dry-run, health checks, and per-project YAML config for repeatable zero-downtime deployments.",
    tags: [
      { name: "powershell", color: "text-[#00ffff]" },
      { name: "cli", color: "text-[#915eff]" },
      { name: "devops", color: "text-[#df4c73]" },
    ],
    image: projectCli,
    source_code_link: "https://github.com/veera-bharath/iis-deploy-cli",
  },
  {
    name: "HRMS",
    description:
      "Human Resources Management System in C# and .NET — manages employee records, departments, designations, leave workflows, and org structure with a clean WinForms UI.",
    tags: [
      { name: "csharp", color: "text-[#00ffff]" },
      { name: "dotnet", color: "text-[#df4c73]" },
      { name: "winforms", color: "text-[#00ff00]" },
    ],
    image: projectHrms,
    source_code_link: "https://github.com/veera-bharath/HRMS",
  },
];
