import ActivityCard from "./ActivityCard";
import EmptyState from "../common/EmptyState";
import Skeleton from "../common/Skeleton";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function ActivityList({ activities, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <EmptyState
        title="Your running journey starts here."
        description="No activities match these filters yet."
        action={
          <Button size="sm" onClick={() => navigate("/run")}>
            START YOUR FIRST RUN
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {activities.map((a) => (
        <ActivityCard key={a.id} activity={a} />
      ))}
    </div>
  );
}
