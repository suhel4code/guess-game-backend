import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// GET destinations with pagination
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = 10;

    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Invalid page number. Must be 1 or greater." });
    }

    const totalDestinations = await Destination.countDocuments();

    if (totalDestinations === 0) {
      return res
        .status(404)
        .json({ message: "No destinations found in the database." });
    }

    const totalPages = Math.ceil(totalDestinations / pageSize);

    if (page > totalPages) {
      return res.status(400).json({
        message: `Page ${page} exceeds total available pages (${totalPages}). Please request a valid page.`,
        totalPages,
      });
    }

    const destinations = await Destination.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      page,
      pageSize,
      totalDestinations,
      totalPages,
      destinations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
