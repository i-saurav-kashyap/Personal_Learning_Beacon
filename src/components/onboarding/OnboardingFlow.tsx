"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/lib/store";
import { COMPANIES } from "@/lib/data/companies";
import type { ExperienceLevel, Language, PlanLength } from "@/lib/types";
import { cn } from "@/lib/cn";

const LEVELS: ExperienceLevel[] = ["Beginner", "Intermediate", "Advanced"];
const PLANS: { value: PlanLength; label: string }[] = [
  { value: 14, label: "14 Days" },
  { value: 30, label: "30 Days" },
  { value: 60, label: "60 Days" },
  { value: 90, label: "90 Days" },
];
const LANGS: Language[] = ["Java", "Python", "JavaScript", "Apex"];

function Option({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium transition-all active:scale-[0.98]",
        selected
          ? "border-brand bg-brand/10 text-fg ring-1 ring-brand"
          : "border-border bg-surface text-muted hover:border-brand/40 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function OnboardingFlow() {
  const router = useRouter();
  const setProfile = useProgress((s) => s.setProfile);
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanLength | null>(null);
  const [language, setLanguage] = useState<Language | null>(null);

  const steps = [
    {
      title: "What's your experience level?",
      done: !!level,
      body: (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {LEVELS.map((l) => (
            <Option key={l} selected={level === l} onClick={() => setLevel(l)}>
              {l}
            </Option>
          ))}
        </div>
      ),
    },
    {
      title: "Which company are you targeting?",
      done: !!company,
      body: (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMPANIES.map((c) => (
            <Option key={c.slug} selected={company === c.slug} onClick={() => setCompany(c.slug)}>
              {c.name}
            </Option>
          ))}
        </div>
      ),
    },
    {
      title: "How much time do you have?",
      done: !!plan,
      body: (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PLANS.map((p) => (
            <Option key={p.value} selected={plan === p.value} onClick={() => setPlan(p.value)}>
              {p.label}
            </Option>
          ))}
        </div>
      ),
    },
    {
      title: "Preferred language?",
      done: !!language,
      body: (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGS.map((l) => (
            <Option key={l} selected={language === l} onClick={() => setLanguage(l)}>
              {l}
            </Option>
          ))}
        </div>
      ),
    },
  ];

  const current = steps[step];

  function finish() {
    if (!level || !company || !plan || !language) return;
    setProfile({ level, company, plan, language, createdAt: Date.now() });
    router.push("/dashboard");
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-brand" : "bg-surface-2",
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">
            Step {step + 1} of {steps.length}
          </p>
          <h3 className="mb-4 text-xl font-bold">{current.title}</h3>
          {current.body}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-muted hover:text-fg disabled:opacity-40"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!current.done}
            className="rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-fg transition-all active:scale-[0.98] disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={finish}
            disabled={!current.done}
            className="rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-fg transition-all active:scale-[0.98] disabled:opacity-40"
          >
            Generate my roadmap →
          </button>
        )}
      </div>
    </div>
  );
}
