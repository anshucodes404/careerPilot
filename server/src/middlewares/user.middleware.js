import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//registering the user in my own database
const registerUser = asyncHandler(async (req, res, next) => {
  const user = req.auth();
  const userId = user?.userId;
  console.log(userId);

  if (!userId) {
    throw new ApiError(500, "UserId not found from clerk");
  }

  const userExist = await User.findOne({ userId });
  if (!userExist) {
   const userCreated = await User.create({ userId });
    console.log("user created");

    if (!userCreated) {
      throw new ApiError(500, "Issue while registering the user");
    }
    console.log(userCreated);
  }

  next();
});

export { registerUser };
