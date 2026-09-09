import { z } from "zod";
import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const settingsSchema = z.object({
  distanceUnit: z.enum(["km", "mi"]).optional(),
  paceUnit: z.enum(["min_km", "min_mi"]).optional(),
  theme: z.enum(["light", "dark"]).optional(),
  notifications: z.boolean().optional(),
});

export const getSettings = asyncHandler(async (req, res) => {
  const { distanceUnit, paceUnit, theme, notifications } = req.user;
  res.json({ settings: { distanceUnit, paceUnit, theme, notifications } });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: parsed.data,
  });

  res.json({
    settings: {
      distanceUnit: user.distanceUnit,
      paceUnit: user.paceUnit,
      theme: user.theme,
      notifications: user.notifications,
    },
  });
});
