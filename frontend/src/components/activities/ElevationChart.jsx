import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useChartPalette, chartTooltipStyle } from "../../utils/chartTheme";

export default function ElevationChart({ gpsPoints }) {
  const c = useChartPalette();
  const points = (gpsPoints || []).filter((p) => typeof p.altitude === "number");
  if (points.length < 2) {
    return <div className="h-40 flex items-center justify-center text-sm text-muted">Elevation data unavailable</div>;
  }

  const data = points.map((p, i) => ({ i, altitude: Math.round(p.altitude) }));

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="i" hide />
          <YAxis tick={{ fontSize: 12, fill: c.tick }} axisLine={false} tickLine={false} width={32} />
          <Tooltip formatter={(v) => [`${v} m`, "Elevation"]} contentStyle={chartTooltipStyle(c)} />
          <Area type="monotone" dataKey="altitude" stroke={c.accent} fill={c.accent} fillOpacity={0.12} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
