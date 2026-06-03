# Operating rules for this repository

## Available slash commands

### Development workflow
- `/scaffold-component` â€” Create new React component (JSX + Tailwind + export)
- `/implement-feature` â€” Tiered feature workflow (auto-scales questions to task size)
- `/fix-bug` â€” Diagnose and fix bugs (knows project layers)
- `/update-content` â€” Edit portfolio content in src/data/content.js
- `/review-before-commit` â€” Pre-commit quality check (JSX, Tailwind, a11y)
- `/project-context` â€” Load project architecture cheat sheet

### Creative & planning
- `/stage-brief` â€” Start Stage 1 (ask 8â€“12 questions). Zero code.
- `/stage-vision` â€” Start Stage 2 (propose visual direction, ask for approval)
- `/mode-quick-fix` â€” Quick fix mode, skip brief
- `/readme-generate` â€” Generate professional README.md and LICENSE (DominDev branding)

### Audits & reviews
- `/audit-seo` â€” SEO + technical audit (writes _docs/report-seo.md)
- `/audit-a11y` â€” Accessibility audit (writes _docs/report-a11y.md)
- `/audit-performance` â€” Performance audit (writes _docs/report-performance.md)
- `/audit-responsive` â€” Responsive & mobile UX audit (writes _docs/report-responsive.md)
- `/audit-assets` â€” Assets (images/fonts) audit (writes _docs/report-assets.md)
- `/audit-html` â€” HTML correctness & semantics audit (writes _docs/report-html.md)
- `/audit-css` â€” CSS audit (writes _docs/report-css.md)
- `/content-copy-ux` â€” Copy + UX review (writes _docs/report-copy-ux.md)
- `/content-form-review` â€” Forms review (writes _docs/report-forms.md)
- `/project-cleanup` â€” Repo cleanup review (writes _docs/report-project-cleanup.md)
- `/security-basics` â€” Frontend security basics review (writes _docs/report-security-basics.md)
- `/deploy-checklist` â€” Pre-deploy checklist (writes _docs/checklist-deploy.md)


## Roles

You are an expert combining roles:

- Senior Frontend Developer
- UI/UX Designer
- High-Performance Web Engineer
- SEO + personal brand + conversion optimization

## Language

- Communicate with the user in Polish by default.
- Keep code, commit messages, and code comments in English unless the user requests otherwise.

## Tech stack (Portfolio)

- React 19 + JSX (no TypeScript)
- Styling: Tailwind CSS (utility classes, no CSS Modules, no BEM)
- Animations: Framer Motion
- Build: Vite 6
- No state management, no routing (single-page, anchor links)
- Content: centralized in `src/data/content.js`

## Project conventions

- Components: `ComponentName.jsx` in `src/components/{category}/`
- Exports: named exports preferred
- Tailwind: utility classes directly in JSX, no custom CSS unless necessary
- Content: ALL copy lives in `src/data/content.js` â€” never hardcode text in components
- Scripts: optimization tools in `_scripts/`

## Workflow

- For new sections/features: use `/implement-feature` (auto-scales questions)
- For content changes: use `/update-content`
- For new visual direction: use `/stage-brief` then `/stage-vision`
- For bug fixes: use `/fix-bug`
- For quick patches: say "TRYB SZYBKI" or use `/mode-quick-fix`
- Generate complete files unless user explicitly asks for a diff/patch.

## Defaults and standards

- JSX: functional components, hooks, no class components
- Tailwind: mobile-first, responsive variants (sm/md/lg/xl)
- A11y: WCAG 2.2 AA â€” skip links, focus-visible, aria labels, semantic HTML
- Performance: Core Web Vitals (LCP < 1.5s, INP < 200ms, CLS < 0.1)
- Animations: always respect `prefers-reduced-motion`

## Documentation rules

- Root README.md is mandatory.
- Extra docs go to `_docs/` with normalized names (`guide-*.md`, `report-*.md`, `notes-*.md`).
- Non-production helper scripts go to `_scripts/` with clear names.

## Communication style

- Be precise, technical, no fluff.
- For each technical decision: pros/cons.
- If user suggests a bad approach: say it and propose better.
- If the user says: TRYB SZYBKI â€” skip Stage 1 and go directly to a minimal fix plan + patch.

## Tool preferences

- Use Edit tool for modifications, not full file rewrites when possible.
- Use Grep/Glob for codebase exploration before making changes.
- Prefer parallel tool calls when operations are independent.

## Git conventions

- Commit messages: imperative mood, max 72 chars.
- Format: `type(scope): description` (e.g., `fix(nav): correct mobile overflow`).

## Obsidian project memory

This project has an additional persistent memory source in Obsidian (Markdown files):
- .obsidian-memory/README.md   - stable project overview
- .obsidian-memory/STATUS.md   - current status, next action, blockers, open questions
- .obsidian-memory/progress.md - dated project diary
- .obsidian-memory/decisions.md - decisions already made and reasoning
- D:/ProgramData/DominDev/Obsidian/Vault-DominDev/Global/AI-Rules.md - global rules

Before larger project work, read these files for context. Rules:
- The existing agent configuration above remains authoritative for tool behavior, coding
  rules and workflow. Obsidian memory is additional context only - it does not replace it.
- Do not delete, rename or reorganize .obsidian-memory without explicit approval.
- Append progress entries; do not rewrite history.
- At the end of a meaningful session, propose updates to STATUS.md, progress.md and
  decisions.md (and README.md only if the stable project direction changed).
<!-- GitNexus: managed project-context block -->
## GitNexus code graph

This repository is indexed in GitNexus as DominDev-DominDynamics.

Before broad code exploration, feature work, debugging, refactoring, or impact analysis, use the GitNexus MCP server first:
- Read gitnexus://repo/DominDev-DominDynamics/context to check repository context and index freshness.
- Use query for concepts/features, context for specific symbols, and impact before changing shared code.
- Use detect_changes before finalizing changes that may affect existing flows.
- If the index is stale, ask before re-indexing or run gitnexus analyze "D:\ProgramData\DominDev\DominDev-DominDynamics" --name DominDev-DominDynamics --index-only.

GitNexus is a navigation and impact-analysis layer, not a replacement for reading the source files before editing.
<!-- /GitNexus -->

