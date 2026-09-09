export function buildStatistics(activities) {
  if (activities.length === 0) {
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
  const avgPaceSec = totalDistanceKm > 0 ? Math.round(totalDurationSec / totalDistanceKm) : null;

  return { totalDistanceKm, totalRuns, totalDurationSec, avgPaceSec, longestRunKm, avgDistanceKm };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
