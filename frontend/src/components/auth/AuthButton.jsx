export default function AuthButton({ children, loading, delay = "930ms", duration = "560ms", ...props }) {
  return (
    <button
      type="submit"
      className="auth-btn auth-reveal"
      style={{ "--delay": delay, "--dur": duration }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="auth-btn__spinner" aria-hidden="true" />
      ) : (
        <>
          <span>{children}</span>
          <svg viewBox="0 0 22 22" width="18" height="18" aria-hidden="true">
            <path
              d="M3 11h15.4M11 3.3l7.7 7.7-7.7 7.7"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </>
      )}
    </button>
  );
}
