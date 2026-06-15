import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page took a wrong turn in the maze.</h1>
      <p className="mt-2 text-muted">Backtrack and try another path.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-fg"
      >
        ← Back home
      </Link>
    </div>
  );
}
