import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if ([email, password].some(field => (typeof field !== "string" || field.trim() === ""))) {
        throw new ApiError(400, "Email and Password are required")
    }

    // let finalUsername = typeof username === "string" && username.trim() !== "" ? username.trim() : (email.split("@")[0] || "user");

    // let suffix = 0
    // // ensure unique username
    // // try original then add numeric suffix until unique
    // // avoid infinite loop by capping
    // while (suffix < 50) {
    //     const exists = await User.findOne({ username: finalUsername })
    //     if (!exists) break
    //     suffix += 1
    //     finalUsername = `${finalUsername}${suffix}`
    // }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(400, "User with this email already exists")
    }

    const user = await User.create({
        email,
        password,
        firstName,
        lastName
    })

    const userCreated = await User.findById(user?._id).select("-password")

    if (!userCreated) {
        throw new ApiError(500, "User creation failed. Try Again !!!")
    }

    return res.status(200).json(
        new ApiResponse(200, userCreated, "Register successful. Proceed to Login")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //get the email from req.body
    const { email, password } = req.body
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    //find the user in DB

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    //match the password
    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password not correct")
    }

    //if matched generate Access and Refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    user.refreshToken = refreshToken

    // const isProd = process.env.NODE_ENV === "production"
    const options = {
        httpOnly: true,
        secure: true,
        // maxAge: 7 * 24 * 60 * 60 * 1000
    }
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //return the user
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            }, "User logged in successfully"))


})


const logoutUser = asyncHandler(async (req, res) => {
    console.log("Logout endpoint hit")
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } })
    
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"))
})

export {loginUser, registerUser, logoutUser}