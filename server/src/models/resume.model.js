import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    userId: {
        type: String, //comes from clerk
        required: true
    },
    note: {
        type: String,
    },
    resumeLink: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);


export const Resume = mongoose.model("Resume", resumeSchema)