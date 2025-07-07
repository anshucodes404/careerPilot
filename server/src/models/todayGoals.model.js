import mongoose, { Schema } from "mongoose";

const todayGoalsSchema = new Schema({
    goalTitle: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export const TodayGoal = mongoose.model("TodayGoal", todayGoalsSchema)