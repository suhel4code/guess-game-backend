import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 1️⃣ Register a new user
router.post("/register", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    let user = await User.findOne({ name });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2️⃣ Get user stats
router.get("/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    console.log("user is ", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3️⃣ Update user stats (correct/wrong answers)
router.put("/update", async (req, res) => {
  const { name, correct, wrong } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    let user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.totalPlay += 1;
    user.correctAnswer += correct || 0;
    user.wrongAnswer += wrong || 0;

    await user.save();
    res.json({ message: "User stats updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
