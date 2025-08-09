import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";
import {getApplications, postApplications, deleteApplications, putApplications} from "../controllers/applications.controller.js"

const applicationRouter = Router()

applicationRouter.use(requireAuth())
applicationRouter.use(registerUser)

applicationRouter.route("/get").get(getApplications)
applicationRouter.route("/post").post(postApplications);
applicationRouter.route("/delete/:_id").delete(deleteApplications)
applicationRouter.route("/put/:_id").put(putApplications)

export default applicationRouter