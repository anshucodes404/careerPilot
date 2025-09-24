import { Application } from "../models/applications.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getApplications = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const applications = await Application.find({ userId }); //returns an array of documents whose userId matches
  // console.log(applications);

  if (!applications) {
    throw new ApiError(500, "Applications fetching failed");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Applications fetched successfully")
    );
});

const postApplications = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log("Post request reached");
  const { company, role, location, status, notes, appliedDate, interviewDate } =
    req.body;
  const userId = req.user?._id;

  if (!company || !role || !appliedDate) {
    throw new ApiError(402, "Company, role, applied Date is required");
  }

  const application = await Application.create({
    userId,
    company,
    role,
    location,
    status,
    notes,
    appliedDate,
    interviewDate,
  });

  if (!application) {
    throw new ApiError(500, "Error occured while saving the application form");
  }

  res
    .status(200)
    .json(new ApiResponse(200, application, "Application saved successfully"));
});

const deleteApplications = asyncHandler(async (req, res) => {
  if (!req.params._id) {
    throw new ApiError(404, "Id not found");
  }

  const deleted = await Application.findOneAndDelete(
    { _id: req.params._id },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, deleted, "Application deleted successfully"));
});

const putApplications = asyncHandler(async (req, res) => {
    console.log(req.body)
  if (!req.params._id) {
    
    throw new ApiError(400, "Id is missing");
  }

  const updatedApp = await Application.findByIdAndUpdate(
    { _id: req.params._id },
    req.body,
    { new: true }
  );

  if (!updatedApp) {
    throw new ApiError(500, "Updation failed");
  }

  res.status(200).json(
    new ApiResponse(200, updatedApp, "Application updated successfully")
  )
});

export {
  getApplications,
  postApplications,
  deleteApplications,
  putApplications,
};
