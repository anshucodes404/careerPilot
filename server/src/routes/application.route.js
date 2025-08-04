import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";
import {getApplications, postApplications, deleteApplications, patchApplications} from "../controllers/applications.controller.js"

const applicationRouter = Router()

applicationRouter.use(requireAuth())
applicationRouter.use(registerUser)

applicationRouter.route("/get").get(getApplications)
applicationRouter.route("/get").post(postApplications)
applicationRouter.route("/get").delete(deleteApplications)
applicationRouter.route("/get").patch(patchApplications)

export default applicationRouter