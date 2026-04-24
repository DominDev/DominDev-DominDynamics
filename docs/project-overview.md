# Project Overview

## What this project is

DominDynamics is a single-page portfolio built to present product thinking, premium interface work, and execution quality in one compact experience.

The site is static-first:

- no backend
- no routing
- one page
- anchor-based navigation between sections

## Main idea

The project is intentionally split into two layers:

- content
- presentation

That means most written content is centralized in one file, while the visual structure stays inside React components.

## Main runtime flow

At a high level, the app works like this:

1. `src/main.jsx` mounts the app
2. `src/App.jsx` assembles the page shell and global UI layers
3. section components render the visible parts of the page
4. `src/data/content.js` provides the text and structured content consumed by those sections

## Section map

The visible page is composed from these main areas:

- `Hero`
  first impression, positioning, primary CTAs
- `About`
  who the portfolio represents and what kind of work it stands for
- `Approach`
  principles, working style, product mindset
- `Architecture`
  structural explanation of how work is organized across layers
- `Work`
  selected project-style highlights and results
- `Contact`
  direct contact path, social links, CV download

Supporting UI layers:

- `Navigation`
  top navigation and mobile menu
- `Preloader`
  intro animation shown on refresh
- `ScrollToTop`
  floating return-to-top button
- background and mockup components
  presentation helpers used by multiple sections

## Key files

- `src/App.jsx`
  main page composition
- `src/data/content.js`
  centralized content source
- `src/components/sections/`
  the main visible sections
- `src/components/layout/`
  navigation and page-level UI shell
- `src/components/ui/`
  shared UI building blocks
- `src/components/effects/`
  decorative and animated visual layers
- `src/hooks/`
  custom interaction hooks
- `src/utils/`
  small shared helpers

## Content model

The project keeps most editable text in `src/data/content.js`.

This includes:

- navigation labels
- hero copy and CTAs
- about and approach content
- architecture data
- work entries
- contact data
- footer data

This keeps copy changes safer because text can evolve without rewriting layout code.

## Asset model

There are two asset layers:

- runtime assets used by the app
  in `src/assets/` and `public/`
- source media used for optimization work
  in `_assets-source/`

Only optimized runtime assets are meant to be shipped with the app.

## Public docs vs working docs

- `docs/`
  official repository documentation
- `_docs/`
  internal working notes, audits, execution plans, generated reports, and archive material

If you want to understand the project, start in `docs/`, not `_docs/`.
