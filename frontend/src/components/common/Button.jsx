const VARIANTS = {
  primary: "bg-ink text-bg hover:opacity-90 disabled:bg-border disabled:text-muted disabled:opacity-100",
  secondary: "bg-transparent text-ink border border-border hover:bg-ink/[0.05]",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "bg-transparent text-muted hover:text-ink",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-full font-semibold tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${
        VARIANTS[variant]
      } ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
