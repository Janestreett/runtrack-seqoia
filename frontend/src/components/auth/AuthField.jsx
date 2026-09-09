import { forwardRef, useState } from "react";

/**
 * Shared text/password field for the auth pages. Forwards its ref so it can
 * be wired directly into React Hook Form's register().
 */
const AuthField = forwardRef(function AuthField(
  { label, error, type = "text", password = false, delay = "0ms", duration = "520ms", ...inputProps },
  ref
) {
  const [visible, setVisible] = useState(false);
  const resolvedType = password ? (visible ? "text" : "password") : type;

  return (
    <div
      className={`auth-field ${password ? "auth-field--password" : ""} auth-reveal`}
      style={{ "--delay": delay, "--dur": duration }}
    >
      {label && <label className="auth-field__label" htmlFor={inputProps.id}>{label}</label>}
      <div className="auth-field__wrap">
        <input ref={ref} type={resolvedType} className="auth-field__input" {...inputProps} />
        {password && (
          <button
            type="button"
            className="auth-field__toggle"
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
      {error && <p className="auth-field__error" role="alert">{error}</p>}
    </div>
  );
});

export default AuthField;
