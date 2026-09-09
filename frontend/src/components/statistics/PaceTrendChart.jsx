import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { formatPace } from "../../utils/pace";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function PaceTrendChart({ series }) {
  const c = useChartPalette();
  const data = (series || [])
    .filter((s) => s.avgPaceSec)
    .map((s) => ({ date: format(new Date(s.date), "d MMM"), pace: s.avgPaceSec }));

  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-sm text-muted">No pace data for this range</div>;
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={c.grid} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: c.tick }} axisLine={false} tickLine={false} />
          <YAxis reversed tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={38} />
          <Tooltip formatter={(v) => [formatPace(v), "Pace /km"]} contentStyle={chartTooltipStyle(c)} />
          <Line type="monotone" dataKey="pace" stroke={c.accent} strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
