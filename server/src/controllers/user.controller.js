import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAcessToken;
        const refreshToken = user.generateRefreshToken;
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    if ([email, username, password].some(field => (field?.trim() === ""))) {
        throw new ApiError(400, "Email, Username, Password is required")
    }

    const existingUser = await User.findOne({
        $or:[{username}, {email}]
    })

    if (existingUser) {
        throw new ApiError(400, "User with this email or password already exists")
    }

    const user = await User.create({
        email,
        username,
        password
    })

    const userCreated = await findById(user?._id).select("-password")

    if (!userCreated) {
        throw new ApiError(500, "User creation failed. Try Again !!!")
    }

    return res.status(200).json(
        new ApiResponse(200, userCreated, "Register successfull. Proceed to Login")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //get the email from req.body
    console.log(req.body)
    const { email, password, username } = req.body
    if (!(email || username)) {
      throw new ApiError(400, "Email is required");
    }
    //find the user in DB

    const user = await User.findOne({
        $or:[{email}, {username}],
    })

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

    const options = {
        httpOnly: true,
        secure: true
    }
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //return the user
    return res
        .status(200)
        .cookie("AccessToken ", accessToken, options)
        .cookie("RefreshToken ", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            }),
            "User logged in successfully"
        )


})

export {loginUser, registerUser}