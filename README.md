# Week 12 – Continuous Integration with GitHub Actions

![CI](https://github.com/snezanakg/week-2-sundgarden/actions/workflows/ci.yml/badge.svg?branch=week12%2Fci-clean)

For this assignment, I used GitHub Actions to automatically test my TypeScript project.

The project builds on my Week 10 TDD exercises and includes library and pizza shop tests.

The CI workflow runs on Node.js 22, 24 and 26. It checks TypeScript types and runs Vitest tests.

I also tested how CI reports failures, fixed the errors, and configured branch protection to require passing checks before merging.

## Run locally

```bash
npm ci
npm run typecheck
npm test
```

My answers are in `ANSWERS.md`, and screenshots from the exercises are saved in `screenshots/`.

Author:Snezana Kragujevac