import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Target, Trophy, Settings as SettingsIcon, ChevronRight } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileForm from "../../components/profile/ProfileForm";
import Skeleton from "../../components/common/Skeleton";
import { profileService } from "../../services/profileService";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../components/common/ToastProvider";

const MENU_ITEMS = [
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/records", label: "Records", icon: Trophy },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

function ProfileMenu() {
  return (
    <div className="md:hidden flex flex-col rounded-2xl border border-border bg-surface overflow-hidden">
      {MENU_ITEMS.map(({ to, label, icon: Icon }, i) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-ink active:bg-ink/[0.05] transition-colors ${
            i !== MENU_ITEMS.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <Icon size={18} strokeWidth={2} className="text-muted shrink-0" />
          <span className="flex-1">{label}</span>
          <ChevronRight size={16} className="text-muted2 shrink-0" />
        </Link>
      ))}
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await profileService.getProfile();
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data) => {
    const updated = await profileService.updateProfile({
      name: data.name,
      weightKg: data.weightKg ? Number(data.weightKg) : null,
    });
    setUser(updated);
    showToast("Profile updated");
    load();
  };

  if (loading || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Profile" />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-8">
        <ProfileHeader user={profile.user} />
        <ProfileStats stats={profile.stats} />
        <ProfileMenu />
        <div>
          <p className="text-sm font-semibold mb-4">Edit Profile</p>
          <ProfileForm user={profile.user} onSubmit={handleSave} />
        </div>
      </div>
    </div>
  );
}
