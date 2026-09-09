import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { recalculateRecords } from "../services/recordsService.js";

export const getRecords = asyncHandler(async (req, res) => {
  await recalculateRecords(req.user.id);
  const records = await prisma.personalRecord.findMany({
    where: { userId: req.user.id },
  });
  res.json({ records });
});
