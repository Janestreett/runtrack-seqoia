export default function AuthCard({ eyebrow, heading, subtitle, children }) {
  return (
    <div className="auth-card auth-reveal" style={{ "--delay": "40ms", "--dur": "820ms" }}>
      <div className="auth-card__inner">
        {eyebrow && (
          <p className="auth-card__badge auth-reveal" style={{ "--delay": "240ms", "--dur": "620ms" }}>
            {eyebrow}
          </p>
        )}
        <h2 className="auth-card__heading auth-reveal" style={{ "--delay": "470ms", "--dur": "620ms" }}>
          {heading}
        </h2>
        {subtitle && (
          <p className="auth-card__subtitle auth-reveal" style={{ "--delay": "570ms", "--dur": "560ms" }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
