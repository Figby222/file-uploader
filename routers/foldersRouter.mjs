import { Router } from "express";
import * as foldersController from "../controllers/foldersController.mjs";

const foldersRouter = Router({ mergeParams: true });

foldersRouter.get("/:folderId", foldersController.getFiles);

foldersRouter.post("/:folderId/create-folder", foldersController.createFolderPost);

export default foldersRouter;