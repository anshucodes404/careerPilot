import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log("first")
    let token = req.cookies?.accessToken
    if (!token) {
      const authHeader = req.header("Authorization") || ""
      if (authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.slice(7).trim()
      }
    }

    if (!token) {
      console.log("Token not found")
      return res.redirect("/signup")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    console.log(user);
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});
