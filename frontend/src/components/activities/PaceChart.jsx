import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatPace } from "../../utils/pace";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function PaceChart({ splits }) {
  const c = useChartPalette();

  if (!splits || splits.length === 0) {
    return <div className="h-48 flex items-center justify-center text-sm text-muted">Not enough GPS data for a pace chart</div>;
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={splits} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={c.grid} />
          <XAxis dataKey="km" tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={38} reversed />
          <Tooltip formatter={(v) => [formatPace(v), "Pace /km"]} contentStyle={chartTooltipStyle(c)} />
          <Line type="monotone" dataKey="paceSecPerKm" stroke={c.accent} strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
