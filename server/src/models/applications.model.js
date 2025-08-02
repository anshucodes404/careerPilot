import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    companyName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    interviewDate: "",
    note: {
        type: String,
    },
    resumeLink: {
        type: String
    },
    success: {
        type: Boolean,
        default: false
    },
    isPending: {
        type: Boolean,
        default: true
    },
  },
  { timestamps: true }
);


export const Application = mongoose.model("Application", applicationSchema)