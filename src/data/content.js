/**
 * data/content.js
 * Centralny magazyn treści strony. 
 * Pozwala na łatwą edycję tekstów bez dotykania struktury komponentów.
 */

export const navItems = [
  { label: "O mnie", href: "#about" },
  { label: "Podejście", href: "#approach" },
  { label: "Architektura", href: "#architecture" },
  { label: "Realizacje", href: "#work" },
];

export const heroRotatingWords = [
  "interfejsy webowe",
  "landing page",
  "aplikacje webowe",
  "frontend UI",
  "produkty cyfrowe",
  "doświadczenia UX",
];

export const principles = [
  {
    number: "P/01",
    title: "Progressive Enhancement",
    text: "Strona działa bez JavaScript. Każda warstwa opcjonalna.",
    iconName: "LayersIcon",
  },
  {
    number: "P/02",
    title: "WCAG 2.2 AA",
    text: "Dostępność to stan domyślny, nie funkcja dodatkowa.",
    iconName: "EyeIcon",
  },
  {
    number: "P/03",
    title: "Mierzalna wydajność",
    text: "LCP < 1.5s, INP < 200ms, CLS < 0.1. Minimum, nie cel.",
    iconName: "PulseIcon",
  },
  {
    number: "P/04",
    title: "Zero długu technicznego",
    text: "Refaktor w roadmapie, nie w ukrytym backlogu.",
    iconName: "CodeIcon",
  },
];

export const architectureCards = [
  {
    layer: "Layer / 01",
    title: "Frontend",
    iconName: "MonitorIcon",
    className: "lg:col-span-7 lg:row-span-2",
    chips: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
      "UI / UX",
    ],
  },
  {
    layer: "Layer / 02",
    title: "Backend",
    iconName: "DatabaseIcon",
    className: "lg:col-span-5",
    chips: ["Node.js", "API", "Bazy danych", "Logika aplikacji", "Integracje"],
  },
  {
    layer: "Layer / 03",
    title: "Dev workflow",
    iconName: "CloudIcon",
    className: "lg:col-span-5",
    chips: [
      "GitHub",
      "Repozytoria",
      "Wersjonowanie",
      "Deploy",
      "Iteracyjna praca",
    ],
  },
  {
    layer: "Layer / 04",
    title: "Tooling i jakość",
    iconName: "CodeIcon",
    className: "lg:col-span-12",
    chips: [
      "Czytelny kod",
      "Komponentowość",
      "Responsywność",
      "SEO basics",
      "Performance thinking",
      "Figma",
      "WordPress",
    ],
  },
];

export const workItems = [
  {
    number: "Case 01",
    year: "2026",
    title: "Nowoczesny landing page dla lokalnej marki.",
    text: "Sekcja demonstracyjna pokazująca, jak może wyglądać przyszłe wdrożenie: mocny hero, jasna oferta, czytelny CTA i nacisk na estetykę premium.",
    metrics: [
      { value: "UI", label: "czytelne" },
      { value: "SEO", label: "podstawy" },
      { value: "UX", label: "przemyślany" },
    ],
    tags: ["Landing page", "Frontend", "Konwersja"],
  },
  {
    number: "Case 02",
    year: "2026",
    title: "Projekt aplikacji webowej w rozwoju.",
    text: "Miejsce na projekt pokazujący więcej niż sam wygląd: strukturę widoków, logikę interfejsu, komponentowe podejście i rozwój w stronę fullstacku.",
    metrics: [
      { value: "Code", label: "clean" },
      { value: "Flow", label: "spójny" },
      { value: "Stack", label: "rosnący" },
    ],
    tags: ["Web app", "Fullstack", "Architektura"],
  },
];

export const contactInfo = {
  email: "contact@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "external" },
    { label: "LinkedIn", href: "#", icon: "external" },
    { label: "CV (PDF)", href: "#", icon: "external" },
  ]
};
