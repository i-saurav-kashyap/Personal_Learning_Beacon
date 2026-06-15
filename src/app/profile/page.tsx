"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";
import { COMPANY_MAP } from "@/lib/data/companies";
import { Card, SectionHeading, Button, Badge } from "@/components/ui/primitives";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const { profile, solved, bookmarks, streak, reset } = useProgress();
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />;

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading title="Profile" subtitle="Your learning profile and progress, stored locally on this device." />

      <Card className="mb-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-xl font-bold text-brand-fg">
            🎓
          </div>
          <div>
            <p className="font-semibold">Learner</p>
            {profile ? (
              <p className="text-sm text-muted">
                {profile.level} · {profile.language} ·{" "}
                {COMPANY_MAP[profile.company]?.name ?? profile.company} · {profile.plan}-day plan
              </p>
            ) : (
              <p className="text-sm text-muted">
                No profile yet.{" "}
                <Link href="/" className="text-brand hover:underline">
                  Start onboarding →
                </Link>
              </p>
            )}
          </div>
        </div>
      </Card>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <Card>
          <p className="text-2xl font-bold">{Object.keys(solved).length}</p>
          <p className="text-xs text-muted">Solved</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold">🔥 {streak}</p>
          <p className="text-xs text-muted">Day streak</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold">🔖 {bookmarks.length}</p>
          <p className="text-xs text-muted">Bookmarks</p>
        </Card>
      </div>

      <Card>
        <h2 className="mb-2 font-semibold">Account & data</h2>
        <p className="mb-3 text-sm text-muted">
          In production this is where OAuth (Google / GitHub) sign-in, cross-device sync, and
          export live. For now everything is saved in your browser.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge>Google OAuth — planned</Badge>
          <Badge>GitHub OAuth — planned</Badge>
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm("Reset all local progress? This cannot be undone.")) reset();
            }}
          >
            Reset progress
          </Button>
        </div>
      </Card>
    </div>
  );
}
