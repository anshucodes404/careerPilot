import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const devOrigin = "http://localhost:5000"
const hostOrigin = "https://careerpilot-jizf.onrender.com";

//middlewares
app.use(cors({
  origin: [devOrigin, hostOrigin],
  credentials: true
}))

// app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"));

//Importing routes
import todayGoalsRouter from "./routes/goals.route.js";
import applicationRouter from "./routes/application.route.js";
import resumeRouter from "./routes/resume.route.js";
import groqRouter from "./routes/groq.route.js";
import profileRouter from "./routes/profile.route.js";

// Wake-up endpoint to prevent sleep mode
app.get("/wake", (req, res) => {
  res.json({ 
    message: "Server is awake!", 
    timestamp: new Date().toISOString(),
    status: "active"
  });
});

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.json({ 
//     status: "healthy", 
//     uptime: process.uptime(),
//     timestamp: new Date().toISOString()
//   });
// });

//Routes declaration
app.use("/api/profile", profileRouter)
app.use("/api/goals", todayGoalsRouter)
app.use("/api/applications", applicationRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", groqRouter)


// Serve static files from the Vite React build if present
const clientDistPath = path.resolve(__dirname, "../../client/dist");
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));


  // Catch-all handler: send back React's index.html file for any non-API routes
  // Using a regex avoids the path-to-regexp v6 "*" parsing error in Express 5
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  console.warn(`Client build not found at ${clientDistPath}. Skipping static file serving.`);
}

export default app;