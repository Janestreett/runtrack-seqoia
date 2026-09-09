import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";

const router = Router();
router.use(requireAuth);

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
