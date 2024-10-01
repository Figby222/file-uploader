import { Router } from "express";
import * as fileController from "../controllers/fileController.mjs";
import foldersRouter from "./foldersRouter.mjs";

const fileRouter = Router();

fileRouter.use("/folders", foldersRouter);

fileRouter.get("/", fileController.getFilesList);

fileRouter.get("/upload", fileController.uploadFileFormGet);

fileRouter.post("/upload", fileController.uploadFilePost);

export default fileRouter;