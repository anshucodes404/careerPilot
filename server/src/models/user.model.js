import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    refreshToken: {
      type: String
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
        type: Schema.Types.ObjectId,
        ref: "TodayGoal",
      },
    ],
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    resumes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//hashing the password when it has been changed
userSchema.pre("save",async function (next) { //here traditional can't be used as we will require this keyword
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
}

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
