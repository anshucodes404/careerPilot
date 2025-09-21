import { Router } from "express";
// import { requireAuth } from "@clerk/express";
import groqRequest from "../controllers/groq.controller.js";

const groqRouter = Router()
// groqRouter.use(requireAuth())


groqRouter.route("/suggestions").post(groqRequest)

export default groqRouter