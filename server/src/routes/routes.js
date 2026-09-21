import { Router } from "express";
import upload from "../middlewares/upload.js";
import { documentController } from "../controllers/documentController.js";
import { searchController } from "../controllers/searchController.js";
import { askController } from "../controllers/askController.js";

const router = Router();

router.post("/upload", upload.single('pdf'), documentController);
router.post("/search", searchController);
router.post("/ask", askController);

export default router;