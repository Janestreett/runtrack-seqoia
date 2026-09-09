import { Link } from "react-router-dom";

export default function AuthFooter({ prompt, linkLabel, to, delay = "1260ms" }) {
  return (
    <p className="auth-footer auth-reveal" style={{ "--delay": delay, "--dur": "500ms" }}>
      {prompt} <Link to={to}>{linkLabel}</Link>
    </p>
  );
}
