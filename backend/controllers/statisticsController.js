import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildStatistics } from "../services/statisticsService.js";

export const getStatistics = asyncHandler(async (req, res) => {
  const { range } = req.query;
  const where = { userId: req.user.id };

  if (range && range !== "all") {
    const days = { "7d": 7, "30d": 30, "3m": 90, "6m": 180, "1y": 365 }[range];
    if (days) {
      const from = new Date();
      from.setDate(from.getDate() - days);
      where.startedAt = { gte: from };
    }
  }

  const activities = await prisma.activity.findMany({
    where,
    orderBy: { startedAt: "asc" },
  });

  const summary = buildStatistics(activities);

  const series = activities.map((a) => ({
    date: a.startedAt,
    distanceKm: a.distanceKm,
    avgPaceSec: a.avgPaceSec,
  }));

  res.json({ summary, series });
});
