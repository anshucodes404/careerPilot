import { Router } from "express";
import { getProfile, putProfile } from "../controllers/profile.controller.js";
// import { registerUser } from "../middlewares/user.middleware.js";
// import { requireAuth } from "@clerk/express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const profileRouter = Router()

profileRouter.use(verifyJWT)

profileRouter.route("/get").get(getProfile)
profileRouter.route("/editProfile").put(putProfile)

export default profileRouter