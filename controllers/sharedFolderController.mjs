import asyncHandler from "express-async-handler";
import db from "../db/queries/sharedFolderQueries.mjs";
import { NotFoundError } from "../lib/errorUtils.mjs";

const sharedFolderGet = asyncHandler(async (req, res) => {
    const sharedFolderContents = await db.sharedFolderContentsGet(req.params.sharedFolderId);

    if (!sharedFolderContents) {
        throw new NotFoundError("Shared Folder Not Found");
    }

    res.render("files-list", { files: sharedFolderContents.folder.files})
})

export { sharedFolderGet }