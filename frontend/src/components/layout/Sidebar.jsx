import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Play,
  ListOrdered,
  BarChart3,
  Target,
  Trophy,
  User,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const GROUPS = [
  {
    label: "Main",
    links: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/run", label: "Run", icon: Play },
      { to: "/activities", label: "Activities", icon: ListOrdered },
      { to: "/statistics", label: "Statistics", icon: BarChart3 },
    ],
  },
  {
    label: "Progress",
    links: [
      { to: "/goals", label: "Goals", icon: Target },
      { to: "/records", label: "Records", icon: Trophy },
    ],
  },
  {
    label: "Account",
    links: [
      { to: "/profile", label: "Profile", icon: User },
      { to: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const initial = (user?.name || "R").trim().charAt(0).toUpperCase();

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-border h-screen sticky top-0 bg-bg">
      <div className="px-6 pt-6 pb-5">
        <p className="text-lg font-extrabold tracking-tight">RUNTRACK</p>
        <p className="text-[11px] text-muted mt-0.5 tracking-wide">RUN. TRACK. IMPROVE.</p>
      </div>

      <nav className="flex-1 flex flex-col gap-5 px-4 overflow-y-auto pb-4">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted2">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 pl-3 pr-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-ink/[0.06] font-semibold text-ink"
                        : "text-muted hover:text-ink hover:bg-ink/[0.04]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <Icon size={18} strokeWidth={2} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-semibold shrink-0">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold truncate">{user?.name || "Runner"}</p>
          <p className="text-[11px] text-muted truncate">{user?.email || ""}</p>
        </div>
        <button
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          className="p-1.5 rounded-md text-muted hover:text-ink hover:bg-ink/[0.06] transition-colors"
        >
          <LogOut size={16} strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}
