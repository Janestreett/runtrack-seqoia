import { prisma } from "../utils/prisma.js";

/**
 * Recalculates a user's personal records from their real activity data.
 * Records are NEVER set manually — always derived from saved activities.
 */
export async function recalculateRecords(userId) {
  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { startedAt: "asc" },
  });

  if (activities.length === 0) return;

  const results = {
    fastest_1k: null,
    fastest_5k: null,
    fastest_10k: null,
    longest_run: null,
    highest_weekly_distance: null,
  };

  for (const a of activities) {
    // Longest run
    if (!results.longest_run || a.distanceKm > results.longest_run.valueKm) {
      results.longest_run = { valueKm: a.distanceKm, activityId: a.id, achievedAt: a.startedAt };
    }

    // Estimate pace-per-km from average pace, used to infer "fastest Nk" splits
    // only for activities that actually covered at least that distance.
    if (a.avgPaceSec) {
      const estTimeFor = (km) => Math.round(a.avgPaceSec * km);
      if (a.distanceKm >= 1) {
        const t = estTimeFor(1);
        if (!results.fastest_1k || t < results.fastest_1k.valueSec) {
          results.fastest_1k = { valueSec: t, activityId: a.id, achievedAt: a.startedAt };
        }
      }
      if (a.distanceKm >= 5) {
        const t = estTimeFor(5);
        if (!results.fastest_5k || t < results.fastest_5k.valueSec) {
          results.fastest_5k = { valueSec: t, activityId: a.id, achievedAt: a.startedAt };
        }
      }
      if (a.distanceKm >= 10) {
        const t = estTimeFor(10);
        if (!results.fastest_10k || t < results.fastest_10k.valueSec) {
          results.fastest_10k = { valueSec: t, activityId: a.id, achievedAt: a.startedAt };
        }
      }
    }
  }

  // Highest weekly distance — bucket activities by ISO week
  const weekTotals = new Map();
  for (const a of activities) {
    const d = new Date(a.startedAt);
    const week = getISOWeekKey(d);
    weekTotals.set(week, (weekTotals.get(week) || 0) + a.distanceKm);
  }
  let bestWeek = null;
  for (const [, total] of weekTotals) {
    if (!bestWeek || total > bestWeek) bestWeek = total;
  }
  if (bestWeek) {
    results.highest_weekly_distance = { valueKm: bestWeek, activityId: null, achievedAt: new Date() };
  }

  for (const [type, data] of Object.entries(results)) {
    if (!data) continue;
    await prisma.personalRecord.upsert({
      where: { userId_type: { userId, type } },
      update: {
        valueSec: data.valueSec ?? null,
        valueKm: data.valueKm ?? null,
        activityId: data.activityId,
        achievedAt: data.achievedAt,
      },
      create: {
        userId,
        type,
        valueSec: data.valueSec ?? null,
        valueKm: data.valueKm ?? null,
        activityId: data.activityId,
        achievedAt: data.achievedAt,
      },
    });
  }
}

function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}
