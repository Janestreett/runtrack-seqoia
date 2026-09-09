import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function DistanceChart({ data }) {
  const c = useChartPalette();

  if (!data || data.length === 0) {
    return <div className="h-56 flex items-center justify-center text-sm text-muted">No data yet</div>;
  }

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={c.grid} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={chartTooltipStyle(c)}
            formatter={(value) => [`${value.toFixed(2)} km`, "Distance"]}
          />
          <Bar dataKey="distanceKm" fill={c.accent} radius={[6, 6, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
