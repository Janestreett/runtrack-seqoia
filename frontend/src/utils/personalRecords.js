/** Derives display-ready personal records from raw activities (client-side fallback view). */
export function deriveRecords(activities) {
  if (!activities || activities.length === 0) return null;

  let longest = activities[0];
  for (const a of activities) if (a.distanceKm > longest.distanceKm) longest = a;

  return { longestRunKm: longest.distanceKm, longestRunId: longest.id };
}
