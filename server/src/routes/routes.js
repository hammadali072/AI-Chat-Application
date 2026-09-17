import { Router } from "express";

const router = Router();

router.post("/upload", upload.single('pdf'), uploadController);