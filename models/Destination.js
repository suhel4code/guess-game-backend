import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  alias: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  clues: { type: [String], required: true },
  funFacts: { type: [String], required: true },
  trivia: { type: [String], required: true },
});

export default mongoose.model("Destination", DestinationSchema);
