import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getRecords } from "../controllers/recordController.js";

const router = Router();
router.use(requireAuth);
router.get("/", getRecords);

export default router;
