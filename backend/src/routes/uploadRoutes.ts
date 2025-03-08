import express from "express";
import { getUserImages, uploadImage } from "../controllers/uploadController";
import upload from "../middlewares/upload";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Extend the Request type to include 'file'
router.post("/image", authMiddleware, upload.single("image"), uploadImage);
router.get("/", authMiddleware, getUserImages);

export default router;
