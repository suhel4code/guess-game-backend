import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalPlay: {
      type: Number,
      default: 0,
    },
    correctAnswer: {
      type: Number,
      default: 0,
    },
    wrongAnswer: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
