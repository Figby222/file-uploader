import asyncHandler from "express-async-handler";
import db from "../db/queries/sharedFolderQueries.mjs";
import { NotFoundError } from "../lib/errorUtils.mjs";
import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;a

const sharedFolderGet = asyncHandler(async (req, res) => {
    const sharedFolderContents = await db.sharedFolderContentsGet(req.params.sharedFolderId);
    if (!sharedFolderContents) {
        throw new NotFoundError("Shared Folder Not Found");
    }
    res.render("files-list", { files: sharedFolderContents.folder.files})
})

const createSharedFolderPost = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
        const sharedFolderDetails = await db.createSharedFolder(folderId);
        res.redirect(`/files/share/${sharedFolderDetails.id}`);
    })
]

export { sharedFolderGet, createSharedFolderPost }