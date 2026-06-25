---
title: Test Case
description: A sample case study page for layout and typography testing.
tags:
  - test
  - portfolio
  - layout
task: Validate the case page layout, sidebar metadata, and markdown rendering.
solution: A dedicated test page with representative content — headings, lists, quotes, code, and images — to check spacing, fonts, and dark mode.
techStack:
  - Astro
  - Tailwind CSS v4
  - Markdown
  - Svelte 5
---

# Test Case

Use this page to preview how a case study looks in the portfolio layout. It lives at `/case/test-case`.

## Overview

This is placeholder copy. Replace it with a real project summary when you're ready.

- Sidebar metadata comes from frontmatter (`tags`, `task`, `solution`, `techStack`)
- Main content is written in Markdown below
- The aside stays hidden when all metadata fields are empty

## Typography check

Body text uses **Instrument Sans**. Headings use *Instrument Serif*. Inline `code` and lists should read clearly in both light and dark mode.

> A blockquote for testing pull quotes and vertical rhythm in the prose styles.

### Code sample

```ts
const greeting = 'Hello from the test case';
console.log(greeting);
```

## Media

![Placeholder image](https://placehold.co/1200x600?text=Test+Case)

## Next steps

1. Tweak copy in `src/content/pages/case/test-case.md`
2. Adjust layout in `MarkdownPage.astro`
3. Duplicate this file as a template for real cases
