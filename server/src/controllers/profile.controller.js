
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getProfile = asyncHandler(async(req, res) => {
    const userId = req.user?._id
    console.log(userId)
    const profile = await User.findById(userId).select("-password -refreshToken")
    console.log(profile)
    return res.status(200).json({ success: true, data: profile })
})

const putProfile = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    const updated = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
    ).select("-password -refreshToken")
    return res.status(200).json({ success: true, data: updated })
})


export { getProfile, putProfile };