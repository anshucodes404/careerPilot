import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  const user = req.auth();
  const userId = user?.userId;

  if (!userId) {
    throw new ApiError(500, "UserId not found from clerk");
  }

  let userCreated;
  const userExist = await User.findOne({ userId });
  if (!userExist) {
    userCreated = await User.create({ userId });
  }

  if (!userCreated) {
    throw new ApiError(500, "Issue while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userCreated, "User registered successfully"));
});

export { registerUser }