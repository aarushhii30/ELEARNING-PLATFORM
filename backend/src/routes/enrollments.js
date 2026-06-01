import { Router } from "express";
import {
  enroll,
  myEnrollments,
  updateProgress,
} from "../controllers/enrollmentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/enroll", requireAuth, enroll);
router.get("/enrollments/me", requireAuth, myEnrollments);
router.put("/enrollments/:id/progress", requireAuth, updateProgress);

export default router;
