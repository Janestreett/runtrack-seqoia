import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { format, startOfWeek } from "date-fns";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function FrequencyChart({ series }) {
  const c = useChartPalette();

  if (!series || series.length === 0) {
    return <div className="h-48 flex items-center justify-center text-sm text-muted">No data for this range</div>;
  }

  const byWeek = new Map();
  for (const s of series) {
    const wk = format(startOfWeek(new Date(s.date), { weekStartsOn: 1 }), "d MMM");
    byWeek.set(wk, (byWeek.get(wk) || 0) + 1);
  }
  const data = [...byWeek.entries()].map(([week, count]) => ({ week, count }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={c.grid} />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: c.tick }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={24} />
          <Tooltip formatter={(v) => [v, "Runs"]} contentStyle={chartTooltipStyle(c)} />
          <Bar dataKey="count" fill={c.accent} radius={[6, 6, 0, 0]} maxBarSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
