import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Wake-up endpoint to prevent sleep mode
app.get("/wake", (req, res) => {
  res.json({ 
    message: "Server is awake!", 
    timestamp: new Date().toISOString(),
    status: "active"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

//Routes declaration
app.use("/api/goals", todayGoalsRouter)
app.use("/api/applications", applicationRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", groqRouter)

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

export default app;