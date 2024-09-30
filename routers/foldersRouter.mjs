import { Router } from "express";
import * as foldersController from "../controllers/foldersController.mjs";

const foldersRouter = Router({ mergeParams: true });

foldersRouter.get("/:folderId", foldersController.getFiles);

export default foldersRouter;