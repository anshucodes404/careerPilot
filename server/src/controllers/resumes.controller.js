import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";


const uploadResume = asyncHandler(async (req, res) => {
    console.log(req.body)
    const resumeLocalPath = req.file?.path

    if(!resumeLocalPath){
        throw new ApiError(404, "Local Path of file is missing")
    }

    const resumeURL = await uploadOnClodinary(resumeLocalPath)
    console.log(resumeURL)

    if(!resumeURL){
        throw new ApiError(500, "File upload failed")
    }

    res.status(200).json(
        new ApiResponse(200, resumeURL, "File uploaded successfully"),
    )
})


export {uploadResume}