import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { openRouterSuggestion } from "../controllers/openRouter.js";

const openRouter = Router();
openRouter.use(requireAuth());

openRouter.route("/suggestions").post(openRouterSuggestion);

export default openRouter;
