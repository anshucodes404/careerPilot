
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getProfile = asyncHandler(async(req, res) => {
    const user = req.auth()
    const userId = user.userId
})

const putProfile = asyncHandler(async (req, res) => {
    const user = req.auth()
    const userId = user.userId

    await User.findOneAndUpdate(
        { userId },
        {
            $set: req.body
        }
    )
})


export { getProfile, putProfile };