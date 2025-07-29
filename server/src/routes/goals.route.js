import { Router } from "express";
import { addTodayGoals, deleteGoals, editGoals, getTodayGoals } from "../controllers/todayGoals.controller.js";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";

const goalsRouter = Router();

goalsRouter.use(requireAuth());

goalsRouter.route("/today-goals").post(addTodayGoals)
goalsRouter.route("/today-goals").get(registerUser, getTodayGoals)
goalsRouter.route("/today-goals").delete(registerUser, deleteGoals)
goalsRouter.route("/today-goals/:_id").patch(registerUser, editGoals)

export default goalsRouter;