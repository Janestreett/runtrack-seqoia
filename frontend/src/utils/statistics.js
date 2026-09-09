export function summarizeActivities(activities) {
  if (!activities || activities.length === 0) {
    return {
      totalDistanceKm: 0,
      totalRuns: 0,
      totalDurationSec: 0,
      avgPaceSec: null,
      longestRunKm: 0,
      avgDistanceKm: 0,
    };
  }

  const totalDistanceKm = round2(activities.reduce((s, a) => s + a.distanceKm, 0));
  const totalDurationSec = activities.reduce((s, a) => s + a.durationSec, 0);
  const totalRuns = activities.length;
  const longestRunKm = round2(Math.max(...activities.map((a) => a.distanceKm)));
  const avgDistanceKm = round2(totalDistanceKm / totalRuns);
  const avgPaceSec = totalDistanceKm > 0 ? totalDurationSec / totalDistanceKm : null;

  return { totalDistanceKm, totalRuns, totalDurationSec, avgPaceSec, longestRunKm, avgDistanceKm };
}

export function groupByDay(activities) {
  const map = new Map();
  for (const a of activities) {
    const key = new Date(a.startedAt).toISOString().slice(0, 10);
    map.set(key, (map.get(key) || 0) + a.distanceKm);
  }
  return [...map.entries()].map(([date, distanceKm]) => ({ date, distanceKm: round2(distanceKm) }));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
