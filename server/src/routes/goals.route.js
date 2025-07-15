import { Router } from "express";
import { addTodayGoals, getTodayGoals } from "../controllers/todayGoals.controller.js";
import { requireAuth } from "@clerk/express";

const goalsRouter = Router();

goalsRouter.use(requireAuth());

goalsRouter.route("/today-goals").post(addTodayGoals)
goalsRouter.route("/today-goals").get(getTodayGoals)

export default goalsRouter;