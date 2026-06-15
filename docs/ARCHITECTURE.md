# Beacon — Architecture & Product Design

This document consolidates the design deliverables for the platform: PRD, system &
data architecture, API spec, taxonomies, the revision / gamification / AI / mock
subsystems, and the production deployment + build roadmap. The current repository
implements the **Frontend Foundation** (Phase 1); everything marked _Planned_ is
specified here and scheduled in §20.

---

## 1. Product Requirements (PRD, condensed)

**Vision.** The best place to go from zero to cracking coding interviews at top product
companies — by teaching *pattern recognition* and *interview communication*, not just topics.

**Problem.** Existing tools either (a) teach topics without interview framing, (b) are
pure judges with no pedagogy, or (c) are static sheets with no feedback loop. Learners
grind hundreds of problems yet still freeze in interviews because they never learned to
*recognise the pattern* or *explain the trade-off*.

**Personas.**
- **Beginner** — never solved DSA. Needs simple, visual, story-based, step-by-step.
- **Intermediate** — knows DSA, fails interviews. Needs patterns, optimisation, mocks.
- **Advanced** — targets top-tier. Needs hard problems, company prep, simulations.

**Five product pillars.** Topic-driven · Pattern-driven · Interview-driven ·
Company-driven · Revision-driven.

**Top-level goals / success metrics.**
- Activation: % of new users who complete onboarding + solve ≥1 problem (target > 60%).
- Engagement: D7 retention, weekly active problem-solving streaks.
- Learning: pattern-quiz accuracy lift; mock-interview score trajectory.
- Outcome (north star): self-reported offers / "interview-ready" rate.

**Non-goals (for v1).** Social feed, paid certification, contest ranking ladder.

**Core user stories.**
1. As a beginner I answer 4 questions and get a day-by-day plan I can follow.
2. As any user I open a problem and see brute→optimal with a plain-English analogy and
   code in my language.
3. As any user, solving a problem schedules it for spaced-repetition automatically.
4. As an advanced user I pick a company and see its pattern/difficulty mix + a plan.
5. As any user I run a timed mock and receive a scored feedback report _(Planned)_.

---

## 2. System Architecture (target)

```
                         ┌─────────────────────────────────────────┐
        Browser /        │              Next.js (Vercel)            │
        Mobile PWA  ───▶ │  App Router · RSC · Tailwind · Zustand   │
                         │  SSR/SSG pages + Route Handlers (BFF)    │
                         └───────────────┬─────────────────────────┘
                                         │ HTTPS / JSON (REST) + SSE (AI stream)
                         ┌───────────────▼─────────────────────────┐
                         │            NestJS API (AWS ECS)          │
                         │  Auth · Content · Progress · Reviews ·   │
                         │  Mock · AI orchestration · Analytics     │
                         └───┬───────────┬──────────┬───────────┬───┘
                             │           │          │           │
                     ┌───────▼──┐  ┌─────▼────┐ ┌───▼────┐  ┌────▼─────┐
                     │PostgreSQL│  │  Redis   │ │  S3    │  │ Claude   │
                     │ (RDS)    │  │ cache/   │ │ assets │  │ API      │
                     │          │  │ sessions │ │/exports│  │ (tutor)  │
                     └──────────┘  └──────────┘ └────────┘  └──────────┘

  Cross-cutting: Sentry (errors) · OpenTelemetry (traces) · PostHog (product analytics)
```

**Why this shape.**
- Next.js renders content pages at the edge (SSG for problems/patterns — they're static
  and SEO-critical) and acts as a **BFF** for the browser, hiding the API and centralising
  auth cookies.
- NestJS owns business logic, the judge/mock orchestration, and AI calls (so prompts &
  keys never touch the client).
- Postgres is the source of truth; Redis caches hot content + holds sessions and
  rate-limit counters; S3 stores user code exports and any media.

---

## 3. Data Model / Database Schema (PostgreSQL)

Mirrors `src/lib/types.ts`. Shown as SQL-ish DDL; production uses Prisma migrations.

```sql
-- Identity ---------------------------------------------------------------
user(id uuid pk, email citext unique, name text, avatar_url text,
     experience_level text, target_company_id uuid, preferred_language text,
     plan_length int, created_at timestamptz, last_active_at timestamptz)
oauth_account(id uuid pk, user_id fk, provider text, provider_account_id text,
              unique(provider, provider_account_id))

-- Content ----------------------------------------------------------------
pattern(id uuid pk, slug text unique, name text, "group" text, tagline text,
        icon text, explanation text, analogy text, recognition jsonb,
        traps jsonb, template jsonb)
topic(id uuid pk, slug text unique, name text, parent_id uuid null, ordinal int)
problem(id uuid pk, slug text unique, title text, difficulty text, statement text,
        beginner_explanation text, analogy text, visual text, dry_run text,
        interview_tips jsonb, common_mistakes jsonb, follow_ups jsonb,
        frequency smallint, created_at timestamptz)
approach(id uuid pk, problem_id fk, tier text, title text, idea text,
         steps jsonb, time_complexity text, space_complexity text, ordinal int)
solution(id uuid pk, problem_id fk, language text, kind text, code text)
problem_pattern(problem_id fk, pattern_id fk, pk(problem_id, pattern_id))
problem_topic(problem_id fk, topic_id fk, pk(problem_id, topic_id))
problem_related(problem_id fk, related_id fk, pk(problem_id, related_id))

-- Sheets & companies -----------------------------------------------------
sheet(id uuid pk, slug text unique, name text, source text, description text,
      total int)
sheet_problem(sheet_id fk, problem_id fk, ordinal int, pk(sheet_id, problem_id))
company(id uuid pk, slug text unique, name text, blurb text,
        topic_distribution jsonb, pattern_distribution jsonb,
        difficulty_distribution jsonb, recommended_plan int)
company_problem(company_id fk, problem_id fk, frequency smallint,
                pk(company_id, problem_id))

-- Progress & revision ----------------------------------------------------
user_problem(user_id fk, problem_id fk, status text, solved_at timestamptz,
             bookmarked bool, notes text, attempts int,
             pk(user_id, problem_id))
review(id uuid pk, user_id fk, problem_id fk, stage smallint, due_at timestamptz,
       ease real, unique(user_id, problem_id))
streak(user_id pk fk, current int, longest int, last_active_day date)
roadmap_progress(user_id fk, plan_length int, day int, completed bool,
                 pk(user_id, plan_length, day))

-- Mock & AI --------------------------------------------------------------
mock_session(id uuid pk, user_id fk, problem_id fk, started_at, ended_at,
             transcript jsonb, scores jsonb)
ai_message(id uuid pk, user_id fk, session_id uuid null, role text, content text,
           tokens int, created_at timestamptz)

-- Gamification & analytics ----------------------------------------------
badge(id uuid pk, slug text, name text, criteria jsonb)
user_badge(user_id fk, badge_id fk, awarded_at, pk(user_id, badge_id))
event(id bigint pk, user_id fk null, name text, props jsonb, ts timestamptz)
```

Key indexes: `problem(slug)`, `review(user_id, due_at)`, `user_problem(user_id, status)`,
`event(name, ts)`. JSONB used where shape is read-mostly and rarely queried relationally
(recognition lists, distributions, transcripts).

---

## 4. API Specification (REST, NestJS — Planned)

Auth via httpOnly cookie (JWT access + refresh). All list endpoints are cursor-paginated.

```
POST   /auth/oauth/:provider          # start OAuth (google|github)
GET    /auth/callback/:provider       # exchange code → set cookies
POST   /auth/refresh                  # rotate tokens
POST   /auth/logout

GET    /me                            # profile + aggregate progress
PATCH  /me                            # update level/company/plan/language

GET    /patterns                      # list (cached)
GET    /patterns/:slug                # detail + problem refs
GET    /topics
GET    /problems?pattern=&topic=&difficulty=&company=&sheet=&cursor=
GET    /problems/:slug                # full teaching payload + solutions
GET    /sheets/:id                    # sheet + ordered problems + user status
GET    /companies/:slug               # distributions + reported problems

POST   /progress/:problemId/solve     # toggle solved → enrol/refresh review
POST   /progress/:problemId/bookmark
PUT    /progress/:problemId/notes
GET    /reviews/due?window=today|tomorrow|week
POST   /reviews/:problemId/recall     # promote SR stage (or reset on fail)

POST   /roadmaps/generate             # {level,company,plan,language} → plan
GET    /roadmaps/:plan/progress

POST   /mock/sessions                 # create a mock → returns problem + ws/sse url
POST   /mock/sessions/:id/finish      # submit → scored report
POST   /ai/tutor          (SSE)       # {problemId, mode, message} → streamed tokens
```

Error envelope: `{ error: { code, message, details? } }`. Rate limits per-user via Redis
token bucket (stricter on `/ai/*`).

---

## 5–8. Frontend / Backend Architecture, Folder Structure, Component Hierarchy

**Folder structure** — see repo `src/` (documented in README). Backend (Planned) mirrors
domains as Nest modules: `auth/ content/ progress/ reviews/ roadmaps/ mock/ ai/
analytics/`, each with `*.controller.ts`, `*.service.ts`, `*.repository.ts`, DTOs.

**Frontend architecture.**
- **Server Components** for all content pages (patterns, problems, companies, sheets,
  roadmaps lists) → SSG, SEO, zero client JS for reading.
- **Client islands** only where interactive: `OnboardingFlow`, `ProblemList` (filters),
  `CodeTabs`, `ProblemActions`, `NotesEditor`, `SortingVisualizer`, dashboard/revision.
- **State**: ephemeral UI = component state; durable user state = Zustand store
  (`src/lib/store.ts`), persisted to `localStorage` now, syncable to the API later by
  swapping the persist storage adapter.

**Component hierarchy (excerpt).**
```
RootLayout
├─ ThemeProvider
├─ Navbar (client: theme toggle, mobile menu)
├─ main
│  ├─ HomePage → OnboardingFlow*
│  ├─ ProblemDetail → ProblemActions* · CodeTabs* · NotesEditor*
│  ├─ PatternDetail
│  ├─ Dashboard* → ProgressBar · TopicRow · RevisionBucket
│  └─ SortingVisualizer*
└─ Footer
   (* = client component)
```

---

## 9. Key User Flows

**Onboarding → roadmap.** Home → 4-step flow (level → company → time → language) →
`setProfile` in store → redirect `/dashboard` → CTA into `/roadmaps/:plan`.

**Solve → revise loop.** Open problem → read brute→optimal → "Mark as solved" →
`toggleSolved` enrols a `review` at stage 0 (due +1d) + bumps streak → item surfaces in
Revision Hub on its due date → "Recalled ✓" promotes to next interval (3→7→15→30d).

**Company-targeted prep.** Companies → company detail (distributions) → "Start N-day
plan" → roadmap.

**Mock (Planned).** Mock Interviews → configure → AI presents problem + timer → code +
think aloud → hints on request → finish → scored report → weak areas feed the roadmap.

---

## 10–11. Wireframes & Design System

**Wireframe — problem detail (mobile-first):**
```
┌───────────────────────────────┐
│ ← Question library            │
│ [Medium] [Two Pointers] ★5/5  │
│ 3Sum                          │
│ [✓ Solved] [Bookmark]         │
│ ── Statement ──────────────── │
│ ── 🌱 Explain like I'm new ── │
│ ── 🌍 Analogy (card) ──────── │
│ ── 👁 Visual (mono block) ─── │
│ ── 🪜 Approaches B→O (cards)─ │
│ ── 🔬 Dry run ─────────────── │
│ ── 💻 Solutions [Py|Java|JS|Apex]
│ ── 🎤 Tips | 🚫 Mistakes ──── │
│ ── 🔁 Follow-ups ──────────── │
│ ── 📝 Notes (autosave) ────── │
│ ── 🔗 Related ──────────────── │
└───────────────────────────────┘
```

**Design system (implemented).**
- **Theming** via CSS variables (`--bg --surface --surface-2 --border --fg --muted
  --brand`), swapped under `.dark`. Tailwind maps them to semantic colors so components
  never hard-code light/dark.
- **Difficulty tokens**: `easy`(green) `medium`(amber) `hard`(red).
- **Type**: Inter (sans) + JetBrains Mono (code).
- **Radius**: cards `2xl`, controls `xl`. **Elevation**: subtle border + soft shadow.
- **Surfaces**: glassmorphic sticky nav (`.glass`).
- **Motion**: Framer Motion step transitions; `prefers-reduced-motion` respected globally.
- **A11y**: skip-link, `:focus-visible` rings, keyboard-navigable controls, semantic
  landmarks, aria labels on icon buttons.
- **Primitives**: `Card`, `Badge`, `DifficultyBadge`, `ProgressBar`, `Button`,
  `SectionHeading` in `src/components/ui/primitives.tsx`.

---

## 12–15. Taxonomies

**Pattern taxonomy** (`group → pattern`): _Core_ {Hashing, Two Pointers, Sliding Window,
Fast&Slow, Binary Search, Monotonic Stack/Queue, Prefix Sum, Heap}; _Advanced_
{Backtracking, Greedy, Divide&Conquer, DP (Fibonacci/Knapsack/Grid/Subsequence/
Partition/Interval), Graphs (DFS/BFS/Topo/Dijkstra/Bellman-Ford/Floyd-Warshall/MST/
Union-Find), Bit Manipulation, Trie}.

**Topic taxonomy**: Complexity → Arrays → Strings → Hashing → Linked Lists → Stacks →
Queues → Trees → BST → Heaps → Tries → Graphs → Recursion → Backtracking → Greedy → DP →
Bit Manip → Union Find → Binary Search → Advanced Strings (KMP/Rabin-Karp/Z).

**Question taxonomy**: each problem is tagged by `{difficulty, patterns[], topics[],
companies[], sheets[], frequency}` — enabling every cross-cut (by pattern, by company,
by sheet, by topic, by frequency for crash course).

**Company taxonomy**: each company carries topic/pattern/difficulty distributions +
reported-problem set + recommended plan. **Integrity rule baked into the UI**: copy
states these reflect publicly reported community experiences, never official disclosures.

---

## 16. Revision System (Spaced Repetition) — implemented

- Intervals `SR_INTERVALS = [1, 3, 7, 15, 30]` days (SM-2-lite).
- Solving a problem auto-creates a `review` at stage 0, due +1 day.
- Revision Hub buckets items into **today / tomorrow / this week** from `due_at`.
- "Recalled ✓" promotes to the next interval; (Planned) a "Forgot" action resets to
  stage 0 and lowers ease. Dashboard surfaces the today-count.

---

## 17. Gamification System

- **Streaks** (implemented): daily activity increments; gap resets. Longest tracked.
- **Badges** (Planned): "First Blood", "Pattern Master: Sliding Window" (all problems in
  a pattern), "Blind 75 Complete", "7-day / 30-day streak", "Mock Ace".
- **Progress rings & levels** (Planned): XP per solve weighted by difficulty + first-try.
- **Weekly goals** (Planned): target N problems / M reviews; gentle nudges, no dark
  patterns.

---

## 18. AI Tutor Architecture (Planned)

- **Model**: latest Claude (e.g. `claude-opus-4-8` for deep explanations,
  `claude-haiku-4-5` for fast hints), called **server-side only** from NestJS `ai` module.
- **Modes**: explain-line-by-line · explain-complexity · graduated-hint · similar-problems
  · diagnose-mistake · mock-interviewer. Each mode is a system-prompt template + the
  problem's structured payload as grounding context (RAG over our own content, not the web).
- **Transport**: SSE stream Next route → NestJS → Claude; tokens streamed to the client.
- **Guardrails**: hint mode is rank-limited (nudge before answer); per-user rate limits
  via Redis; transcripts stored in `ai_message` for continuity and quality review.

---

## 19. Mock Interview Architecture (Planned)

- **Session**: `mock_session` row + ephemeral Redis state (timer, current hint level).
- **Editor**: in-browser Monaco; code execution via a sandboxed judge (isolated
  containers / Firecracker, per-language images) behind the API with CPU/mem/time limits.
- **Interviewer loop**: AI presents problem → listens to candidate reasoning → asks
  clarifying/probing questions → offers graduated hints → escalates follow-ups.
- **Scoring**: rubric over {correctness, optimality, code quality, communication, time}
  → structured JSON → feedback report; weak dimensions feed roadmap + revision.

---

## 20. Production Deployment Plan & Build Roadmap

**Deployment.**
- **Frontend**: Vercel (preview per PR, edge SSG/ISR for content, image optimisation).
- **API**: AWS ECS Fargate behind ALB; autoscaling on CPU + request count.
- **Data**: RDS PostgreSQL (Multi-AZ) + ElastiCache Redis; S3 for assets/exports.
- **Judge**: isolated container pool, network-egress-locked.
- **CI/CD**: GitHub Actions → typecheck, lint, test, build → migrate (Prisma) → deploy;
  blue/green on ECS.
- **Observability**: Sentry (FE+BE), OpenTelemetry traces to a collector, PostHog events.
- **Security**: httpOnly cookies, CSRF tokens on mutations, per-route rate limits, WAF,
  least-privilege IAM, secrets in AWS Secrets Manager.
- **Scale posture**: content is read-mostly and aggressively cached (CDN + Redis), so the
  hot path scales horizontally; Postgres read replicas for analytics.

**Phased roadmap.**
1. **Foundation (this repo)** — design system, content model, Patterns + Question Library,
   sheets, companies, roadmaps, sorting visualizer, dashboard, spaced repetition (local).
2. **Backend + Auth** — NestJS, Postgres/Prisma, OAuth, server-persisted progress; swap
   the Zustand persist adapter for API sync.
3. **Content scale** — author the full Blind 75 / NeetCode 150 / sheets; remaining
   visualizers (search, trees, graphs, DP).
4. **AI Tutor** — streaming explanations, hints, mistake diagnosis.
5. **Mock Interviews** — editor + judge + AI interviewer + scored reports.
6. **Gamification & growth** — badges, XP, weekly goals, analytics-driven nudges.
```
