# Development Basics

## Purpose

This guide explains the core local commands and what they are for.

It is intentionally short.

## Core commands

### `npm run dev`

Starts the development server.

Use it during active work when you want:

- fast refresh
- local iteration
- immediate visual feedback

This is the best command for day-to-day editing.

### `npm run build`

Creates the production build in `dist/`.

Use it when you want to confirm that the app still compiles as a real production bundle.

### `npm run preview`

Serves the already built production output locally.

Use it when you want to check behavior closer to the final deployed result.

This is especially useful for:

- asset loading
- network checks
- production-like rendering
- verifying that a dev-only behavior is not misleading

## Quality commands

### `npm run format:check`

Checks whether files follow the project's Prettier formatting rules.

### `npm run lint`

Checks code quality, React usage, accessibility basics, and unused imports.

### `npm run test:smoke`

Runs the lightweight app render test.

### `npm run test:e2e`

Runs the minimal Playwright browser smoke tests.

This is useful after changes that affect:

- navigation
- interactions
- mobile menu behavior
- runtime browser behavior

### `npm run check`

Runs the basic pre-ship verification chain:

- format check
- lint
- smoke test
- production build

## Bundle analysis

### `npm run analyze:bundle`

Builds the app and generates a bundle visualization report in:

- `_docs/bundle-analysis-report.html`

Use this after bigger changes such as:

- adding a new library
- expanding motion-heavy sections
- importing heavier runtime assets

This command is for analysis, not daily development.

## A simple workflow

For content or UI work:

1. `npm run dev`
2. review the result visually
3. run `npm run check`

For browser-behavior changes:

1. `npm run dev`
2. test the interaction
3. run `npm run test:e2e`
4. run `npm run check`

For performance or bundle questions:

1. `npm run build`
2. `npm run preview`
3. `npm run analyze:bundle`

## Internal vs public docs

If you need stable project guidance, stay in `docs/`.

If you need working notes, archived reports, or execution plans, use `_docs/`.
