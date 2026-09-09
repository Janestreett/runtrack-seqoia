import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getStatistics } from "../controllers/statisticsController.js";

const router = Router();
router.use(requireAuth);
router.get("/", getStatistics);

export default router;
