import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const uploadResume = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const resumeLocalPath = req.file?.path;

  if (!resumeLocalPath) {
    throw new ApiError(404, "Local Path of file is missing");
  }

  const resumeURL = await uploadOnClodinary(resumeLocalPath);

  if (!resumeURL) {
    throw new ApiError(500, "File upload failed");
  }
console.log(resumeURL)
  //adding the link of resumes to resume array in user model
  const user = req.auth();
  const userId = user.userId;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  //mongoDB query to find user
   const updateRes = await User.findOneAndUpdate(
    { userId },
    {
      $push: {
        resumes: resumeURL.secure_url,
      },
    },
    { new: true } // Return the updated document
  );

  if (!updateRes) {
    throw new ApiError(404, "User not found or update failed");
  }

  // console.log(updateRes)
  console.log("This is the last second log")
  console.log(resumeURL)

  res
    .status(200)
    .json(new ApiResponse(200, resumeURL, "File uploaded successfully"));
});

export { uploadResume };
