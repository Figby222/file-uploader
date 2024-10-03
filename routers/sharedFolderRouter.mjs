import { Router } from "express";
import * as sharedFolderController from "../controllers/sharedFolderController.mjs";

const sharedFolderRouter = Router({ mergeParams: true });

sharedFolderRouter.get("/:sharedFolderId", sharedFolderController.sharedFolderGet);



export default sharedFolderRouter;