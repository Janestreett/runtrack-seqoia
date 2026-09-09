import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ActivityFilters from "../../components/activities/ActivityFilters";
import ActivityList from "../../components/activities/ActivityList";
import { useActivities } from "../../hooks/useActivities";

export default function Activities() {
  const [filters, setFilters] = useState({ type: "all", range: "all", q: "" });
  const { activities, loading } = useActivities(filters);

  return (
    <div className="max-w-app mx-auto">
      <PageHeader title="Activities" subtitle="Every run you've logged, in one place." />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-5">
        <ActivityFilters filters={filters} onChange={setFilters} />
        <div className="max-w-3xl">
          <ActivityList activities={activities} loading={loading} />
        </div>
      </div>
    </div>
  );
}
