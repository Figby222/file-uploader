import { Router } from "express";
import * as fileController from "../controllers/fileController.mjs";

const fileRouter = Router();

fileRouter.get("/", fileController.getFilesList);

fileRouter.get("/upload", fileController.uploadFileFormGet);

fileRouter.post("/upload", fileController.uploadFilePost);

export default fileRouter;