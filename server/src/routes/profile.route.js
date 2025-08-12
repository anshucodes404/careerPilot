import { Router } from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { registerUser } from "../middlewares/user.middleware.js";
import { requireAuth } from "@clerk/express";

const profileRouter = Router()

profileRouter.use(requireAuth())

profileRouter.route("/get").get(registerUser, getProfile)

export default profileRouter