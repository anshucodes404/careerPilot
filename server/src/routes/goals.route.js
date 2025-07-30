import { Router } from "express";
import { addTodayGoals, deleteGoals, editGoals, getTodayGoals, toggleGoals } from "../controllers/todayGoals.controller.js";
import { requireAuth } from "@clerk/express";
import { registerUser } from "../middlewares/user.middleware.js";

const goalsRouter = Router();

goalsRouter.use(requireAuth());

goalsRouter.route("/today-goals").post(addTodayGoals)
goalsRouter.route("/today-goals").get(registerUser, getTodayGoals)
goalsRouter.route("/today-goals").delete(registerUser, deleteGoals)
goalsRouter.route("/today-goals/goalText/:_id").patch(registerUser, editGoals)
goalsRouter.route("/today-goals/completed/:_id").patch(registerUser, toggleGoals)

export default goalsRouter;