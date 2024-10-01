import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import db from "../db/queries/folderQueries.mjs";
import asyncHandler from "express-async-handler";

const getFiles = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const folderContents = await db.getFiles(parseInt(req.params.folderId));
        res.render("files-list", { currentFolderId: req.params.folderId, files: folderContents.files, childFolders: folderContents.childFolders})
    })
]

export { getFiles }