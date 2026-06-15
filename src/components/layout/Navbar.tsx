"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Patterns", href: "/patterns" },
  { label: "Topics", href: "/topics" },
  { label: "Crash Course", href: "/crash-course" },
  { label: "Problems", href: "/problems" },
  { label: "Sheets", href: "/sheets" },
  { label: "Company Wise", href: "/companies" },
  { label: "Visualizers", href: "/visualizers" },
  { label: "Mock Interviews", href: "/mock-interviews" },
  { label: "AI Tutor", href: "/ai-tutor" },
  { label: "Dashboard", href: "/dashboard" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" aria-hidden />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-base transition-colors hover:bg-surface-2"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-brand-fg">
            B
          </span>
          <span className="hidden sm:inline">Beacon</span>
        </Link>

        <div className="ml-2 hidden flex-1 items-center gap-0.5 overflow-x-auto xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/profile"
            className="hidden h-9 items-center rounded-lg border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-2 sm:flex"
          >
            Profile
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface xl:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface xl:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 p-3 sm:grid-cols-3">
            {NAV_ITEMS.concat({ label: "Profile", href: "/profile" }).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
