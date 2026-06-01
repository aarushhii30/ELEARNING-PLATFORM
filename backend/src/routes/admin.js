import { Router } from "express";
import { listUsers, reports } from "../controllers/adminController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/users", requireAuth, requireAdmin, listUsers);
router.get("/reports", requireAuth, requireAdmin, reports);

export default router;
