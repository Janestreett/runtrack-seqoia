import { z } from "zod";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildStatistics } from "../services/statisticsService.js";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  weightKg: z.number().positive().nullable().optional(),
});

export const getProfile = asyncHandler(async (req, res) => {
  const activities = await prisma.activity.findMany({ where: { userId: req.user.id } });
  const stats = buildStatistics(activities);
  const { passwordHash, ...user } = req.user;

  res.json({
    user,
    stats: {
      totalDistanceKm: stats.totalDistanceKm,
      totalRuns: stats.totalRuns,
      longestRunKm: stats.longestRunKm,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: parsed.data,
  });

  const { passwordHash, ...rest } = user;
  res.json({ user: rest });
});
