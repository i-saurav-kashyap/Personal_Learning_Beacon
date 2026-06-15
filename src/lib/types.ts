// ---------------------------------------------------------------------------
// Core domain types for the DSA Interview Prep Platform.
// These mirror what the eventual PostgreSQL schema will hold; for this
// frontend-first pass they back typed local seed data.
// ---------------------------------------------------------------------------

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Language = "Java" | "Python" | "JavaScript" | "Apex";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

export type PlanLength = 14 | 30 | 60 | 90;

export interface CodeSolution {
  /** Which "flavor" of code this is. */
  kind: "Clean" | "Interview" | "Production";
  language: Language;
  code: string;
}

export interface Approach {
  title: string;
  /** e.g. "Brute Force", "Better", "Optimal" */
  tier: "Brute Force" | "Better" | "Optimal";
  idea: string;
  steps: string[];
  time: string;
  space: string;
}

export interface Problem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  /** pattern slugs this problem trains */
  patterns: string[];
  topics: string[];
  companies: string[];
  /** membership in curated sheets */
  sheets: SheetId[];
  statement: string;
  beginnerExplanation: string;
  realWorldAnalogy: string;
  visualExplanation: string;
  approaches: Approach[];
  dryRun: string;
  interviewTips: string[];
  commonMistakes: string[];
  followUps: string[];
  related: string[]; // problem slugs
  solutions: CodeSolution[];
  /** community-reported frequency, 1–5 */
  frequency: number;
}

export interface PatternQuestionRef {
  slug: string;
  title: string;
  difficulty: Difficulty;
}

export interface Pattern {
  slug: string;
  name: string;
  group: string;
  tagline: string;
  icon: string; // emoji for lightweight visuals
  explanation: string;
  analogy: string;
  /** how to recognise this pattern in an interview prompt */
  recognition: string[];
  traps: string[];
  template?: { language: Language; code: string };
  questions: PatternQuestionRef[];
}

export type SheetId =
  | "blind75"
  | "neetcode150"
  | "namaste"
  | "striver"
  | "top50";

export interface Company {
  slug: string;
  name: string;
  blurb: string;
  topicDistribution: { label: string; pct: number }[];
  patternDistribution: { label: string; pct: number }[];
  difficultyDistribution: { easy: number; medium: number; hard: number };
  reportedProblems: string[]; // problem slugs
  recommendedPlan: PlanLength;
}

export interface RoadmapDay {
  day: number;
  title: string;
  focus: string;
  problems: string[]; // slugs
}

export interface Roadmap {
  length: PlanLength;
  title: string;
  summary: string;
  days: RoadmapDay[];
}

export interface OnboardingProfile {
  level: ExperienceLevel;
  company: string;
  plan: PlanLength;
  language: Language;
  createdAt: number;
}
