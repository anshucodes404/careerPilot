import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    userId: {
      type: String, //comes from clerk
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    appliedDate: {
      type: Date,
      required: true,
    },
    interviewDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    tags: [String],
    resumeLink: {
      type: String,
    },
    status: {
      type: String,
      default: "Applied",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
