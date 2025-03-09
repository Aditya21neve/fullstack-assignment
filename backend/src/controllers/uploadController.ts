import { Request, Response } from "express";
import prisma from "../config/prisma";
import path from "path";

// Upload Image
export const uploadImage = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    if (!req.user) {
      res.status(400).json({ message: "No user found" });
      return;
    }

    const userId = req.user.id; // Get user ID from request body (or JWT)

    const filePath = `/uploads/${req.file.filename}`; // File path

    console.log(req.user, filePath, "filePath");
    // Save file data to the database
    const image = await prisma.image.create({
      data: {
        url: filePath,
        userId: userId,
      },
    });

    res.status(201).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get All Images for a User
export const getUserImages = async (req: any, res: Response): Promise<void> => {
  try {
    console.log(req.user, "req.user");

    const { id } = req.user;

    const images = await prisma.image.findMany({ where: { userId: id } });

    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
