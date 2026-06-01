import { Router } from "express";
import {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", listCourses);
router.get("/:id", getCourse);
router.post("/", requireAuth, requireAdmin, createCourse);
router.put("/:id", requireAuth, requireAdmin, updateCourse);
router.delete("/:id", requireAuth, requireAdmin, deleteCourse);

export default router;
