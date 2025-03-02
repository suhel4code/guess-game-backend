import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "./models/Destination.js"; // Import model
import { connectDb } from "./connectDb.js";
import fs from "fs";

dotenv.config();
connectDb();

const data = JSON.parse(fs.readFileSync("destinations.json", "utf-8"));

const seedDatabase = async () => {
  try {
    await Destination.deleteMany();
    await Destination.insertMany(data);
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
