# Content Editing

## Purpose

This guide explains how to update the portfolio content without changing the component structure.

In most cases, content edits should happen in:

- `src/data/content.js`

## What can be edited there

The file contains the structured content used across the page, including:

- navigation labels
- hero headline, rotating words, supporting copy, and CTAs
- about section copy and highlight cards
- approach principles
- architecture branch content
- work entries, metrics, and tags
- contact email, social links, and CTA labels
- footer links and supporting text

## Safe editing rule

If you want to change wording, emphasis, labels, or contact data, start with `src/data/content.js`.

Do not begin by editing JSX unless one of these is true:

- you need a new visual block
- you need a new interaction
- the current data structure is no longer enough

## Practical workflow

1. Open `src/data/content.js`
2. Find the section object that matches the part of the page you want to change
3. Edit the text values only
4. Run the app locally
5. Check the section on desktop and mobile

## Examples

Typical safe changes:

- update a hero CTA label
- change the email address
- replace a work card title
- adjust architecture chips
- refine supporting copy in About

Changes that may require component work:

- adding a new field that the component does not render yet
- changing the number or layout of visual cards
- adding new animation logic

## What should stay out of content.js

Some strings are intentionally local to components because they are:

- decorative mockup labels
- technical helper labels inside fake browser/mockup UI
- implementation-only labels that are not part of the real product copy

That keeps `content.js` focused on real editable content instead of every visible string in the repository.

## How to verify a content change

For simple edits:

1. `npm run dev`
2. review the changed section visually

Before shipping broader content changes:

1. `npm run format:check`
2. `npm run lint`
3. `npm run test:smoke`
4. `npm run build`

## Good editing habits

- keep labels concise
- avoid breaking mobile layouts with unnecessarily long copy
- preserve the tone already established in the project
- treat CTA text as action-oriented, not generic filler
- when changing structured lists, keep data shape consistent with nearby items
