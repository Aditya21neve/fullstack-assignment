import express from "express";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
