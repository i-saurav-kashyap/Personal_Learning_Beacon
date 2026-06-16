"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  desc?: string;
}
interface NavGroupDef {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroupDef[] = [
  {
    label: "Learn",
    items: [
      { label: "Full DSA Course", href: "/course", desc: "A-to-Z, 369 problems, step by step" },
      { label: "Concept Lessons", href: "/concepts", desc: "Plain-English primers on the core ideas" },
      { label: "Roadmaps", href: "/roadmaps", desc: "14 / 30 / 60 / 90-day plans" },
      { label: "Patterns", href: "/patterns", desc: "Recognise the shape of any problem" },
      { label: "Topics", href: "/topics", desc: "The full DSA syllabus" },
      { label: "Crash Course", href: "/crash-course", desc: "Last-minute revision" },
    ],
  },
  {
    label: "Practice",
    items: [
      { label: "Problems", href: "/problems", desc: "The full question library" },
      { label: "Sheets", href: "/sheets", desc: "Blind 75, NeetCode 150 & more" },
      { label: "Company Wise", href: "/companies", desc: "Targeted company prep" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Visualizers", href: "/visualizers", desc: "Watch algorithms run" },
      { label: "Mock Interviews", href: "/mock-interviews", desc: "Timed AI interview + report" },
      { label: "AI Tutor", href: "/ai-tutor", desc: "A senior engineer beside you" },
    ],
  },
];

const DIRECT_LINKS: NavItem[] = [{ label: "Dashboard", href: "/dashboard" }];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

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

function NavGroup({ group, pathname }: { group: NavGroupDef; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = group.items.some((i) => isActive(pathname, i.href));

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
        )}
      >
        {group.label}
        <span aria-hidden className={cn("text-[10px] transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>

      {open && (
        <div role="menu" className="absolute left-0 top-full pt-2">
          <div className="min-w-[240px] rounded-xl border border-border bg-surface p-1.5 shadow-lg">
            {group.items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 transition-colors",
                  isActive(pathname, i.href) ? "bg-surface-2" : "hover:bg-surface-2",
                )}
              >
                <span className="block text-sm font-medium text-fg">{i.label}</span>
                {i.desc && <span className="block text-xs text-muted">{i.desc}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border glass">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-brand-fg">B</span>
          <span>Beacon</span>
        </Link>

        {/* Desktop grouped nav */}
        <div className="ml-3 hidden items-center gap-1 md:flex">
          {NAV_GROUPS.map((g) => (
            <NavGroup key={g.label} group={g} pathname={pathname} />
          ))}
          {DIRECT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(pathname, l.href) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {l.label}
            </Link>
          ))}
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
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="mx-auto max-w-7xl space-y-4 p-4">
            {NAV_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-widest text-muted">
                  {g.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {g.items.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm font-medium",
                        isActive(pathname, i.href)
                          ? "bg-surface-2 text-fg"
                          : "text-muted hover:bg-surface-2 hover:text-fg",
                      )}
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-1 border-t border-border pt-3">
              {DIRECT_LINKS.concat({ label: "Profile", href: "/profile" }).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-fg"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
