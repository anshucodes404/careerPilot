import mongoose, { Schema } from "mongoose";

const todayGoalsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goalText: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TodayGoal = mongoose.model("TodayGoal", todayGoalsSchema);
