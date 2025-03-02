import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import destinationRoutes from "./routes/destinationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDb } from "./connectDb.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDb();

// API Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
