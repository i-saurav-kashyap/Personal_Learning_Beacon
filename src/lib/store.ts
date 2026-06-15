"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingProfile } from "@/lib/types";

// Spaced-repetition intervals (days) — SM-2-lite schedule.
export const SR_INTERVALS = [1, 3, 7, 15, 30];

export interface ReviewItem {
  slug: string;
  /** index into SR_INTERVALS */
  stage: number;
  /** epoch ms when this item is next due */
  dueAt: number;
}

interface ProgressState {
  profile: OnboardingProfile | null;
  solved: Record<string, number>; // slug -> solvedAt epoch ms
  bookmarks: string[];
  notes: Record<string, string>;
  reviews: Record<string, ReviewItem>;
  streak: number;
  lastActiveDay: string | null; // YYYY-MM-DD

  setProfile: (p: OnboardingProfile) => void;
  toggleSolved: (slug: string) => void;
  toggleBookmark: (slug: string) => void;
  setNote: (slug: string, text: string) => void;
  /** advance a review item to its next stage after a successful recall */
  promoteReview: (slug: string, now?: number) => void;
  scheduleReview: (slug: string, now?: number) => void;
  touchStreak: (today?: string) => void;
  reset: () => void;
}

function ymd(epoch: number): string {
  return new Date(epoch).toISOString().slice(0, 10);
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      profile: null,
      solved: {},
      bookmarks: [],
      notes: {},
      reviews: {},
      streak: 0,
      lastActiveDay: null,

      setProfile: (p) => set({ profile: p }),

      toggleSolved: (slug) =>
        set((s) => {
          const solved = { ...s.solved };
          const reviews = { ...s.reviews };
          if (solved[slug]) {
            delete solved[slug];
            delete reviews[slug];
          } else {
            const now = Date.now();
            solved[slug] = now;
            // auto-enrol into spaced repetition at stage 0
            reviews[slug] = {
              slug,
              stage: 0,
              dueAt: now + SR_INTERVALS[0] * 86400000,
            };
          }
          return { solved, reviews };
        }),

      toggleBookmark: (slug) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(slug)
            ? s.bookmarks.filter((x) => x !== slug)
            : [...s.bookmarks, slug],
        })),

      setNote: (slug, text) =>
        set((s) => ({ notes: { ...s.notes, [slug]: text } })),

      scheduleReview: (slug, now = Date.now()) =>
        set((s) => ({
          reviews: {
            ...s.reviews,
            [slug]: { slug, stage: 0, dueAt: now + SR_INTERVALS[0] * 86400000 },
          },
        })),

      promoteReview: (slug, now = Date.now()) =>
        set((s) => {
          const cur = s.reviews[slug];
          if (!cur) return {};
          const stage = Math.min(cur.stage + 1, SR_INTERVALS.length - 1);
          return {
            reviews: {
              ...s.reviews,
              [slug]: { slug, stage, dueAt: now + SR_INTERVALS[stage] * 86400000 },
            },
          };
        }),

      touchStreak: (today = ymd(Date.now())) => {
        const { lastActiveDay, streak } = get();
        if (lastActiveDay === today) return;
        const yesterday = ymd(Date.now() - 86400000);
        set({
          streak: lastActiveDay === yesterday ? streak + 1 : 1,
          lastActiveDay: today,
        });
      },

      reset: () =>
        set({
          profile: null,
          solved: {},
          bookmarks: [],
          notes: {},
          reviews: {},
          streak: 0,
          lastActiveDay: null,
        }),
    }),
    { name: "beacon-progress" },
  ),
);

// --- Selectors / helpers ----------------------------------------------------

export function dueReviews(reviews: Record<string, ReviewItem>, now = Date.now()) {
  const items = Object.values(reviews);
  const today: ReviewItem[] = [];
  const tomorrow: ReviewItem[] = [];
  const week: ReviewItem[] = [];
  const dayMs = 86400000;
  for (const r of items) {
    const diff = r.dueAt - now;
    if (diff <= 0) today.push(r);
    else if (diff <= dayMs) tomorrow.push(r);
    else if (diff <= 7 * dayMs) week.push(r);
  }
  return { today, tomorrow, week };
}
