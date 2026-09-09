import AuthVisual from "./AuthVisual";
import "../../styles/auth.css";

export default function AuthLayout({ badge, headlineLines, children }) {
  return (
    <div className="auth-root">
      <div className="auth-stage">
        <AuthVisual badge={badge} headlineLines={headlineLines} />
        <div className="auth-pane">{children}</div>
      </div>
    </div>
  );
}
