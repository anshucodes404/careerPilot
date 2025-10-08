import { Router } from "express";
import { addTodayGoals, deleteGoals, editGoals, getTodayGoals, toggleGoals } from "../controllers/todayGoals.controller.js";
// import { requireAuth } from "@clerk/express";
// import {  from "../middlewares/user.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const todayGoalsRouter = Router();

todayGoalsRouter.use(verifyJWT);

todayGoalsRouter.route("/today-goals").post( addTodayGoals)
todayGoalsRouter.route("/today-goals").get(getTodayGoals)
todayGoalsRouter.route("/today-goals").delete(deleteGoals)
todayGoalsRouter.route("/today-goals/goalText/:_id").patch(editGoals)
todayGoalsRouter.route("/today-goals/completed/:_id").patch(toggleGoals)

export default todayGoalsRouter;