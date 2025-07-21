import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userId: {
        type: String, //Comes from clerk
        required: true
    },
    todayGoals: [
        {
            type: mongoose.Types.ObjectId,
            ref: "TodayGoal"
        }
    ]
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)