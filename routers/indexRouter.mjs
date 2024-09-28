import { Router } from "express";
import * as indexController from "../controllers/indexController.mjs";

const indexRouter = Router();

indexRouter.get("/log-in", indexController.logInFormGet);

indexRouter.get("/sign-up", indexController.signUpFormGet);

indexRouter.get("/", indexController.indexRouteGet);

indexRouter.post("/sign-up", indexController.signUpPost);

export default indexRouter;