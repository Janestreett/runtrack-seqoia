const VARIANT_STYLES = {
  success: "bg-ink text-bg",
  error: "bg-danger text-white",
};

export default function Toast({ message, variant = "success" }) {
  return (
    <div
      role="status"
      className={`pointer-events-auto px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg animate-[fadeIn_0.2s_ease-out] ${
        VARIANT_STYLES[variant] || VARIANT_STYLES.success
      }`}
    >
      {message}
    </div>
  );
}
