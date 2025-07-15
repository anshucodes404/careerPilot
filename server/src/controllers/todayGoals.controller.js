import { TodayGoal } from "../models/todayGoals.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTodayGoals = asyncHandler(async (req, res) => {
  console.log("get")
  const user = req.auth();
  const userId = user.userId;
  console.log("Get request")

  //to write aggregate pipelines to find documents having same userID
  //matching the userId
  //looking up for the documents having same userID

  const userTodayGoals = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $lookup: {
        from: "todaygoals",
        localField: "todayGoals",
        foreignField: "userId",
        as: "todayGoals",
        pipeline: [
          {
            $project: {
              goalText: 1,
              completed: 1,
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userTodayGoals[0].todayGoals,
        "Today Goals of the user found"
      )
    );
});

const addTodayGoals = asyncHandler(async (req, res) => {
  const user = req.auth();
  // console.log(user)
  const userId = user.userId;
  // console.log(userId)
  // console.log(req)
  // console.log(req.body.goalText)
  const { goalText } = req.body;

  console.log(goalText);

  if (!goalText) {
    throw new ApiError(400, "Text of goal is missing");
  }

  const goal = await TodayGoal.create({ userId, goalText });
  console.log("Goal is created");
  console.log(goal);

  return res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal created successfully"));
});

export { addTodayGoals, getTodayGoals };
