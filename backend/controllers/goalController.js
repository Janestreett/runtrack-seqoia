import { z } from "zod";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const goalSchema = z.object({
  type: z.enum(["distance", "frequency", "time", "pace"]),
  targetValue: z.number().positive(),
  period: z.enum(["week", "month", "year"]),
  startDate: z.string(),
  endDate: z.string(),
});

async function computeProgress(goal, userId) {
  const activities = await prisma.activity.findMany({
    where: {
      userId,
      startedAt: { gte: new Date(goal.startDate), lte: new Date(goal.endDate) },
    },
  });

  let actual = 0;
  if (goal.type === "distance") {
    actual = activities.reduce((s, a) => s + a.distanceKm, 0);
  } else if (goal.type === "frequency") {
    actual = activities.length;
  } else if (goal.type === "time") {
    actual = activities.reduce((s, a) => s + a.durationSec, 0) / 60;
  } else if (goal.type === "pace") {
    const withPace = activities.filter((a) => a.avgPaceSec);
    actual = withPace.length
      ? withPace.reduce((s, a) => s + a.avgPaceSec, 0) / withPace.length
      : 0;
  }

  const progressPct =
    goal.type === "pace"
      ? actual > 0
        ? Math.min(100, Math.round((goal.targetValue / actual) * 100))
        : 0
      : Math.min(100, Math.round((actual / goal.targetValue) * 100));

  return { actual: Math.round(actual * 100) / 100, progressPct };
}

export const getGoals = asyncHandler(async (req, res) => {
  const goals = await prisma.goal.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  const withProgress = await Promise.all(
    goals.map(async (g) => ({ ...g, ...(await computeProgress(g, req.user.id)) }))
  );

  res.json({ goals: withProgress });
});

export const createGoal = asyncHandler(async (req, res) => {
  const parsed = goalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }
  const data = parsed.data;

  const goal = await prisma.goal.create({
    data: {
      userId: req.user.id,
      type: data.type,
      targetValue: data.targetValue,
      period: data.period,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
  });

  res.status(201).json({ goal });
});

export const updateGoal = asyncHandler(async (req, res) => {
  const existing = await prisma.goal.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ message: "Goal not found" });

  const parsed = goalSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const goal = await prisma.goal.update({
    where: { id: existing.id },
    data: {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    },
  });

  res.json({ goal });
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const existing = await prisma.goal.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ message: "Goal not found" });

  await prisma.goal.delete({ where: { id: existing.id } });
  res.status(204).send();
});
