import { Router } from "express";
import * as foldersController from "../controllers/foldersController.mjs";

const foldersRouter = Router({ mergeParams: true });

foldersRouter.get("/rename/:folderId", foldersController.renameFolderFormGet);

foldersRouter.post("/:folderId/create-folder", foldersController.createFolderPost);

foldersRouter.get("/:folderId", foldersController.getFiles);

foldersRouter.post("/rename/:folderId", foldersController.renameFolderPost);



export default foldersRouter;