import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: String, //Comes from clerk
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    location: {
      type: String,
    },
    preferredRoles: [{ type: String }],
    availability: {
      type: String,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      portfolio: String,
      twitter: String,
    },
    primarySkills: [
      {
        type: String,
      },
    ],
    experience: {
      type: String,
    },
    currentGoal: {
      type: String,
    },
    todayGoals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TodayGoal",
      },
    ],
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
      },
    ],
    resumes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Resume",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
