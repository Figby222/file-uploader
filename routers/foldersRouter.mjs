import { Router } from "express";
import * as foldersController from "../controllers/foldersController.mjs";

const foldersRouter = Router({ mergeParams: true });

foldersRouter.post("/:folderId/create-folder", foldersController.createFolderPost);

foldersRouter.get("/:folderId", foldersController.getFiles);


export default foldersRouter;