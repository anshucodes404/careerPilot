import mongoose from "mongoose";
import { TodayGoal } from "../models/todayGoals.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTodayGoals = asyncHandler(async (req, res) => {
  // console.log("getrequest")
  const userId = req.user?._id;

  // Fetch all today goals for the user
  const userDocs = await TodayGoal.find({ userId }); //
  // console.log(userDocs)

  return res.status(200).json(
    new ApiResponse(
      200,
      userDocs, //
      "Today Goals of the user found"
    )
  );
});

const addTodayGoals = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log(req)
  console.log("Now consolling req.user")
  console.log(req.user)
  const { goalText } = req.body;

  if (!goalText) {
    throw new ApiError(400, "Text of goal is missing");
  }

  let goal;
  try {
    goal = await TodayGoal.create({ userId, goalText });
    console.log("Goal is created", goal);

    // push the goal's _id to user's todayGoals array
    await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          todayGoals: goal._id,
        },
      }
    );

    console.log(goal);
    return res
      .status(200)
      .json(new ApiResponse(200, goal, "Goal created successfully"));
  } catch (err) {
    console.error("Error creating TodayGoal:", err);
    throw new ApiError(500, "Failed to create TodayGoal");
  }
});

const deleteGoals = asyncHandler(async (req, res) => {
  // console.log("req.body:", req.body);
  const { _id } = req.body;

  const deleted = await TodayGoal.findByIdAndDelete(_id);
  // console.log("Deleted:", deleted);

  const user = await User.findById(req.user?._id);
  console.log("user searching..");
  if (!user) {
    throw new ApiError(500, "UserId is not correct");
  }
  console.log(user);
  console.log("user found");

  await User.findOneAndUpdate({ userId }, { $pull: { todayGoals: _id } });

  return res.status(200).json({ deleted });
});

const editGoals = asyncHandler(async (req, res) => {
  console.log(req.params._id);
  console.log(req.body);
  //finding the id and update
  try {
    const updatedGoal = await TodayGoal.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    console.log(updatedGoal);
    if (!updatedGoal) {
      throw new ApiError(404, "Error while updating the goal");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedGoal, "Update successfull"));
  } catch (error) {
    throw new ApiError(400, "Something went wrong while updating", error);
  }
});

const toggleGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const goal = await TodayGoal.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );

    console.log(goal);
    if (!goal) {
      throw new ApiError(400, "goal not found");
    }

    res.status(200).json(new ApiResponse(200, goal, "Toggle successfull"));
  } catch (error) {
    throw new ApiError(400, "Toggle failed", error);
  }
});

export { addTodayGoals, getTodayGoals, deleteGoals, editGoals, toggleGoals };
