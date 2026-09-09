import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function DistanceOverTimeChart({ series }) {
  const c = useChartPalette();

  if (!series || series.length === 0) {
    return <div className="h-56 flex items-center justify-center text-sm text-muted">No data for this range</div>;
  }

  const data = series.map((s) => ({ date: format(new Date(s.date), "d MMM"), distanceKm: s.distanceKm }));

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={c.grid} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: c.tick }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={32} />
          <Tooltip formatter={(v) => [`${v.toFixed(2)} km`, "Distance"]} contentStyle={chartTooltipStyle(c)} />
          <Area type="monotone" dataKey="distanceKm" stroke={c.accent} fill={c.accent} fillOpacity={0.12} strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
