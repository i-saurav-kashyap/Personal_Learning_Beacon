# Beacon — Personal Learning Beacon

A pattern-driven, interview-focused DSA learning platform. Built to take a learner
from "never solved a problem" to "FAANG-ready" — by teaching **pattern recognition**,
**optimisation**, and **how to explain solutions in an interview**, not just topics.

> This repository is the **working app foundation** (pass 1). It is a real, runnable
> Next.js application with a polished design system and a deep Patterns + Question
> Library showpiece. The full product vision and the remaining build phases are in
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## What's built and working

| Area | Status |
| --- | --- |
| Design system (dark/light, a11y, responsive, glass nav) | ✅ |
| Personalized onboarding → roadmap (level / company / time / language) | ✅ |
| **Patterns** (17) — explanation, analogy, recognition guide, traps, template, problems | ✅ |
| **Question Library** (61) — brute→better→optimal, dry run, complexity, tips, mistakes, follow-ups, Java/Python/JS/Apex | ✅ |
| **Full DSA Course** — A-to-Z, 16 steps / 369 problems (Striver A2Z structure) with check-off progress, deep-linking into the library | ✅ |
| Grouped navbar — Learn / Practice / Tools dropdowns + Dashboard | ✅ |
| Curated sheets (Blind 75, NeetCode 150, Namaste, Striver, Top 50) with progress | ✅ |
| Company-wise prep (topic/pattern/difficulty distributions) | ✅ |
| Roadmaps (14/30/60/90 day) with progress tracking | ✅ |
| Visualizers — Sorting (5 algos), Binary Search, Tree Traversal, Graph BFS/DFS (play/pause/step/speed) | ✅ |
| Dashboard (progress, streak, weak/strong topics, revision schedule) | ✅ |
| Spaced-repetition Revision Hub (1·3·7·15·30 day) | ✅ |
| **AI Tutor** — streaming Claude chat via `/api/tutor` (set `ANTHROPIC_API_KEY`; graceful fallback without it) | ✅ |
| **Mock Interview engine** — live AI interviewer + code editor + timer + AI-graded report (`/api/mock/*`; scripted demo + heuristic report without a key) | ✅ |

State persists locally (Zustand + `localStorage`) — no backend required for this pass.

## Tech stack (this pass)

- **Next.js (App Router) + React 19 + TypeScript**
- **TailwindCSS** with a CSS-variable theming system + `@tailwindcss/typography`
- **Framer Motion** for onboarding transitions
- **Zustand** (persisted) for progress, bookmarks, notes, streak, spaced repetition
- **next-themes** for dark/light

The production target (NestJS + PostgreSQL + Redis + S3 + OAuth + AI) is specified in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Run it

This project uses **pnpm** (pinned via the `packageManager` field). Install pnpm with
`brew install pnpm` or `corepack enable` (Node ≥ 20), then:

```bash
pnpm install     # respects the supply-chain policy below
pnpm dev         # http://localhost:3000
pnpm build       # production build (all routes prerender)
```

### Supply-chain hardening
- **pnpm** with a strict, integrity-checked store; dependency build scripts are
  **blocked by default** — only packages allow-listed in `pnpm-workspace.yaml`
  (`allowBuilds`) may run them (currently just `sharp`).
- **Publish cooldown** (`minimumReleaseAge: 1440`) refuses any version published in
  the last 24h, dodging freshly-compromised releases.
- **CI** (`.github/workflows/ci.yml`) installs with `--frozen-lockfile`, runs
  `pnpm audit` (fails on high/critical), typechecks, and builds.
- **Dependabot** (`.github/dependabot.yml`) keeps deps and Actions patched weekly.
- The AI Tutor key lives only in `.env.local` (gitignored); never shipped to the client.

## Project layout

```
src/
  app/                 # App Router pages (home, patterns, problems, sheets, …)
  components/
    layout/            # Navbar, Footer
    ui/                # primitives (Card, Badge, Button, ProgressBar …)
    onboarding/        # OnboardingFlow
    problems/          # ProblemList, CodeTabs, ProblemActions, NotesEditor
    visualizers/       # SortingVisualizer
  lib/
    types.ts           # domain model (mirrors future DB schema)
    store.ts           # Zustand progress + spaced-repetition store
    data/              # typed seed content: patterns, problems, companies, roadmaps
docs/
  ARCHITECTURE.md      # PRD, system + data architecture, APIs, taxonomies, roadmap
```

## Content integrity

Company sections reflect **publicly reported community interview experiences and
trends**. We never claim a problem was officially asked by any company.