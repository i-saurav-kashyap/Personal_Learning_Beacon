export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-fg">Beacon — Personal Learning Beacon</p>
          <p>Pattern-driven DSA interview prep. Built for beginners → FAANG.</p>
        </div>
        <p className="mt-4 text-xs leading-relaxed">
          Company sections reflect publicly reported community interview experiences and
          trends. We never claim a problem was officially asked by any company.
        </p>
      </div>
    </footer>
  );
}
