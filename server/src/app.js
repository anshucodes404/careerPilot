import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


//Importing routes
import todayGoalsRouter from "./routes/goals.route.js";
import applicationRouter from "./routes/application.route.js";

//Routes declaration
app.use("/api/goals", todayGoalsRouter)
app.use("/api/applications", applicationRouter)

export default app;