import { format } from "date-fns";

export default function ProfileHeader({ user }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-ink text-bg flex items-center justify-center text-lg font-semibold shrink-0">
        {initials}
      </div>
      <div>
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-muted">{user.email}</p>
        <p className="text-xs text-muted mt-0.5">Running since {format(new Date(user.createdAt), "MMMM yyyy")}</p>
      </div>
    </div>
  );
}
