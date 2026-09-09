import { NavLink } from "react-router-dom";
import { Home, BarChart3, Play, ListOrdered, User } from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/activities", label: "Activities", icon: ListOrdered },
  { to: "/run", label: "Run", icon: Play, emphasized: true },
  { to: "/statistics", label: "Stats", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

export default function MobileNavbar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-between px-2 py-2">
        {LINKS.map(({ to, label, icon: Icon, emphasized }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] ${
                emphasized
                  ? "bg-accent text-white"
                  : isActive
                  ? "text-ink font-semibold"
                  : "text-muted"
              }`
            }
          >
            <Icon size={emphasized ? 20 : 18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
