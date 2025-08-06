import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"));


//Importing routes
import todayGoalsRouter from "./routes/goals.route.js";
import applicationRouter from "./routes/application.route.js";
import resumeRouter from "./routes/resume.route.js";
import groqRouter from "./routes/groq.route.js";

//Routes declaration
app.use("/api/goals", todayGoalsRouter)
app.use("/api/applications", applicationRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", groqRouter)
export default app;