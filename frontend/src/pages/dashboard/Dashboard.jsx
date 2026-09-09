import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import TodayProgress from "../../components/dashboard/TodayProgress";
import WeeklyChart from "../../components/dashboard/WeeklyChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import GoalPreview from "../../components/dashboard/GoalPreview";
import PersonalRecordsPreview from "../../components/dashboard/PersonalRecordsPreview";
import Skeleton from "../../components/common/Skeleton";
import { useAuthStore } from "../../store/authStore";
import { activityService } from "../../services/activityService";
import { goalService } from "../../services/goalService";
import { recordService } from "../../services/recordService";
import { format } from "date-fns";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [acts, gls, recs] = await Promise.all([
        activityService.getActivities({}),
        goalService.getGoals().catch(() => []),
        recordService.getRecords().catch(() => []),
      ]);
      setActivities(acts);
      setGoals(gls);
      setRecords(recs);
      setLoading(false);
    })();
  }, []);

  const today = format(new Date(), "yyyy-MM-dd");
  const todayActivities = activities.filter((a) => format(new Date(a.startedAt), "yyyy-MM-dd") === today);

  return (
    <div className="max-w-app mx-auto">
      <PageHeader
        title={`Good ${greeting()}, ${user?.name?.split(" ")[0] || "Runner"}`}
        subtitle="Ready for your next run?"
        action={
          <button
            onClick={() => navigate("/run")}
            className="hidden md:inline-flex px-6 py-3 rounded-full bg-ink text-bg font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            START RUN
          </button>
        }
      />

      <div className="px-5 md:px-8 py-6 md:py-8">
        {/* Mobile-only start run CTA (desktop has it in the header) */}
        <button
          onClick={() => navigate("/run")}
          className="md:hidden mb-6 w-full px-7 py-3.5 rounded-full bg-ink text-bg font-semibold text-sm tracking-wide"
        >
          START RUN
        </button>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6 md:items-start">
            {/* Main column */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <TodayProgress todayActivities={todayActivities} />
              <WeeklyChart activities={activities} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Recent Activities</p>
                <RecentActivity activities={activities} />
              </div>
            </div>

            {/* Side column */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Current Goals</p>
                <GoalPreview goals={goals} />
              </div>
              <PersonalRecordsPreview records={records} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
