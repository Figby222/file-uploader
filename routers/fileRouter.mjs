import { Router } from "express";
import * as fileController from "../controllers/fileController.mjs";

const fileRouter = Router();

fileRouter.get("/upload", fileController.uploadFileFormGet);

export default fileRouter;