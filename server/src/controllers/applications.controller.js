import { Application } from "../models/applications.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"


const getApplications = asyncHandler(async (req, res) => {
    const user = req.auth()
    const userId = user.userId;

    const applications = await Application.find({userId}); //returns an array of documents whose userId matches
    console.log(applications)

    if(!applications){
        throw new ApiError(500, "Applications fetching failed")
    }

    res.status(200).json(
        new ApiResponse(200, applications, "Applications fetched successfully")
    )
})

const postApplications = asyncHandler(async(req, res) => {
    console.log(req.body)
    console.log("Post request reached")
    const {company, role, location, status, notes, appliedDate, interviewDate, tags} = req.body;
    const user = req.auth();
    const userId = user.userId;

    if(!company || !role || !appliedDate){
        throw new ApiError(402, "Company, role, applied Date is required")
    }

    const application = await Application.create({userId, company, role, location, status, notes, appliedDate, interviewDate, tags})

    if(!application){
        throw new ApiError(500, "Error occured while saving the application form")
    }

    res.status(200).json(
        new ApiResponse(200, application, "Application saved successfully")
    )

})

const deleteApplications = asyncHandler(async (req, res) => {});

const patchApplications = asyncHandler(async (req, res) => {});

export {getApplications, postApplications, deleteApplications, patchApplications}