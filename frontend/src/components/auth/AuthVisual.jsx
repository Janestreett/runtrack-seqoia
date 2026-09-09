/**
 * Original RUNTRACK visual scene for the auth pages.
 * No stock imagery / no falcon — an abstract route-line treatment
 * rendered entirely in CSS + inline SVG, communicating movement
 * and pace without relying on a photo asset.
 */
export default function AuthVisual({ badge, headlineLines = [] }) {
  return (
    <div className="auth-visual">
      <svg
        className="auth-visual__lines"
        viewBox="0 0 800 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeGradA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2c6f66" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1f5c56" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="routeGradB" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3a8a7d" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f201d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -40 780 C 140 700, 220 560, 160 420 C 100 280, 260 260, 340 360 C 430 480, 560 460, 610 320 C 660 180, 780 160, 860 60"
          fill="none"
          stroke="url(#routeGradA)"
          strokeWidth="2.5"
        />
        <path
          d="M -60 920 C 120 900, 260 840, 300 700 C 340 560, 480 600, 520 720 C 560 840, 700 820, 760 680"
          fill="none"
          stroke="url(#routeGradB)"
          strokeWidth="1.5"
        />
        <circle cx="860" cy="60" r="4" fill="#4fa896" />
        <circle cx="-40" cy="780" r="4" fill="#4fa896" opacity="0.6" />
      </svg>

      <div className="auth-visual__scrim" />

      <p className="auth-visual__brand">RUNTRACK</p>

      <div className="auth-visual__content">
        {badge && <p className="auth-visual__badge">{badge}</p>}
        <h1
          className="auth-visual__headline auth-reveal-clip"
          style={{ "--delay": "120ms", "--dur": "480ms" }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
