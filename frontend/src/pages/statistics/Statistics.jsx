import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatisticsFilters from "../../components/statistics/StatisticsFilters";
import StatisticsCard from "../../components/statistics/StatisticsCard";
import DistanceOverTimeChart from "../../components/statistics/DistanceChart";
import PaceTrendChart from "../../components/statistics/PaceTrendChart";
import FrequencyChart from "../../components/statistics/FrequencyChart";
import Skeleton from "../../components/common/Skeleton";
import { useStatistics } from "../../hooks/useStatistics";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";

export default function Statistics() {
  const [range, setRange] = useState("30d");
  const { summary, series, loading } = useStatistics(range);

  return (
    <div className="max-w-app mx-auto">
      <PageHeader title="Statistics" subtitle="Understand how your running is changing over time." />
      <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-6">
        <StatisticsFilters range={range} onChange={setRange} />

        {loading || !summary ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatisticsCard label="Total Distance" value={summary.totalDistanceKm.toFixed(1)} unit="km" />
              <StatisticsCard label="Total Runs" value={summary.totalRuns} />
              <StatisticsCard label="Total Time" value={formatDuration(summary.totalDurationSec)} />
              <StatisticsCard label="Avg Pace" value={formatPace(summary.avgPaceSec)} unit="/km" />
              <StatisticsCard label="Longest Run" value={summary.longestRunKm.toFixed(1)} unit="km" />
              <StatisticsCard label="Avg Distance" value={summary.avgDistanceKm.toFixed(1)} unit="km" />
            </div>

            <div className="border border-border rounded-2xl p-5 bg-surface">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Distance</p>
              <DistanceOverTimeChart series={series} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-border rounded-2xl p-5 bg-surface">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Pace Trend</p>
                <PaceTrendChart series={series} />
              </div>

              <div className="border border-border rounded-2xl p-5 bg-surface">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Run Frequency</p>
                <FrequencyChart series={series} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
