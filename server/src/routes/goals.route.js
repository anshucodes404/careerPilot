import { Router } from "express";
import { addTodayGoals, deleteGoals, editGoals, getTodayGoals, toggleGoals } from "../controllers/todayGoals.controller.js";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";

const todayGoalsRouter = Router();

todayGoalsRouter.use(requireAuth());

todayGoalsRouter.route("/today-goals").post(registerUser, addTodayGoals)
todayGoalsRouter.route("/today-goals").get(registerUser, getTodayGoals)
todayGoalsRouter.route("/today-goals").delete(registerUser, deleteGoals)
todayGoalsRouter.route("/today-goals/goalText/:_id").patch(registerUser, editGoals)
todayGoalsRouter.route("/today-goals/completed/:_id").patch(registerUser, toggleGoals)

export default todayGoalsRouter;