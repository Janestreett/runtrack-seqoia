import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = Router();
router.use(requireAuth);

router.get("/", getActivities);
router.get("/:id", getActivity);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
