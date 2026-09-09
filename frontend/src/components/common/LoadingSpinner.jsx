export default function LoadingSpinner({ className = "" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`w-5 h-5 border-2 border-border border-t-ink rounded-full animate-spin ${className}`}
    />
  );
}
