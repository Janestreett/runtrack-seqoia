import { z } from "zod";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { recalculateRecords } from "../services/recordsService.js";

const gpsPointSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  altitude: z.number().nullable().optional(),
  accuracy: z.number().nullable().optional(),
  timestamp: z.string(),
});

const createActivitySchema = z.object({
  title: z.string().min(1),
  type: z.string().default("run"),
  distanceKm: z.number().nonnegative(),
  durationSec: z.number().int().nonnegative(),
  avgPaceSec: z.number().int().nullable().optional(),
  avgSpeedKmh: z.number().nullable().optional(),
  calories: z.number().int().nullable().optional(),
  elevationGainM: z.number().nullable().optional(),
  startedAt: z.string(),
  endedAt: z.string(),
  gpsPoints: z.array(gpsPointSchema).default([]),
});

export const getActivities = asyncHandler(async (req, res) => {
  const { type, range, q } = req.query;
  const where = { userId: req.user.id };

  if (type && type !== "all") where.type = type;
  if (q) where.title = { contains: String(q), mode: "insensitive" };

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
    orderBy: { startedAt: "desc" },
  });

  res.json({ activities });
});

export const getActivity = asyncHandler(async (req, res) => {
  const activity = await prisma.activity.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { gpsPoints: { orderBy: { sequence: "asc" } } },
  });

  if (!activity) return res.status(404).json({ message: "Activity not found" });
  res.json({ activity });
});

export const createActivity = asyncHandler(async (req, res) => {
  const parsed = createActivitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }
  const data = parsed.data;

  const activity = await prisma.activity.create({
    data: {
      userId: req.user.id,
      title: data.title,
      type: data.type,
      distanceKm: data.distanceKm,
      durationSec: data.durationSec,
      avgPaceSec: data.avgPaceSec ?? null,
      avgSpeedKmh: data.avgSpeedKmh ?? null,
      calories: data.calories ?? null,
      elevationGainM: data.elevationGainM ?? null,
      startedAt: new Date(data.startedAt),
      endedAt: new Date(data.endedAt),
      gpsPoints: {
        create: data.gpsPoints.map((p, i) => ({
          lat: p.lat,
          lng: p.lng,
          altitude: p.altitude ?? null,
          accuracy: p.accuracy ?? null,
          timestamp: new Date(p.timestamp),
          sequence: i,
        })),
      },
    },
  });

  await recalculateRecords(req.user.id);

  res.status(201).json({ activity });
});

export const updateActivity = asyncHandler(async (req, res) => {
  const schema = z.object({ title: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const existing = await prisma.activity.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ message: "Activity not found" });

  const activity = await prisma.activity.update({
    where: { id: existing.id },
    data: { title: parsed.data.title },
  });

  res.json({ activity });
});

export const deleteActivity = asyncHandler(async (req, res) => {
  const existing = await prisma.activity.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ message: "Activity not found" });

  await prisma.activity.delete({ where: { id: existing.id } });
  await recalculateRecords(req.user.id);

  res.status(204).send();
});
