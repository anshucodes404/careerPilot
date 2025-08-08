import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";
import {getApplications, postApplications, deleteApplications, patchApplications} from "../controllers/applications.controller.js"

const applicationRouter = Router()

applicationRouter.use(requireAuth())
applicationRouter.use(registerUser)

applicationRouter.route("/get").get(getApplications)
applicationRouter.route("/post").post(postApplications);
applicationRouter.route("/delete").delete(deleteApplications)
applicationRouter.route("/patch").patch(patchApplications)

export default applicationRouter