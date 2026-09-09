export default function PageHeader({ title, subtitle, action }) {
  return (
    <>
      {/* Mobile compact header */}
      <header className="md:hidden sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-border px-5 py-4 flex items-center justify-between">
        <p className="text-lg font-bold tracking-tight">{title || "RUNTRACK"}</p>
        {action}
      </header>

      {/* Desktop header */}
      <div className="hidden md:flex items-start justify-between px-8 pt-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted mt-1.5">{subtitle}</p>}
        </div>
        {action}
      </div>
    </>
  );
}
