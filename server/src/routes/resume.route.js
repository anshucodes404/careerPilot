import { Router } from "express";
import { uploadResume } from "../controllers/resumes.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
// import { requireAuth } from "@clerk/express";

const resumeRouter = Router();
// resumeRouter.use(requireAuth())

resumeRouter.route("/upload").post(
  //using multer middleware
 upload.single("resume"), uploadResume);

export default resumeRouter;
