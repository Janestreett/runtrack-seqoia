export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <p className="text-lg font-semibold text-ink mb-1">{title}</p>
      {description && <p className="text-sm text-muted mb-6 max-w-xs">{description}</p>}
      {action}
    </div>
  );
}
