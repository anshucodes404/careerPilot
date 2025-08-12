import { asyncHandler } from "../utils/asyncHandler.js"


const getProfile = asyncHandler(async(req, res) => {
    const user = req.auth()
    const userId = user.userId

    
})


export {getProfile}