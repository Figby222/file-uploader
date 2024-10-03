import asyncHandler from "express-async-handler";
import db from "../db/queries/sharedFolderQueries.mjs";
import { NotFoundError } from "../lib/errorUtils.mjs";
import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import { body, validationResult } from "express-validator";
import folderDb from "../db/queries/folderQueries.mjs";

const validateCreateSharedFolder = [
    body("share_folder_duration")
        .notEmpty().withMessage("Duration must not be empty")
        .isInt({ min: 0 }).withMessage("Duration must be a postive integer")
]

const sharedFolderGet = asyncHandler(async (req, res) => {
    const sharedFolderContents = await db.sharedFolderContentsGet(req.params.sharedFolderId);
    if (!sharedFolderContents) {
        throw new NotFoundError("Shared Folder Not Found");
    }
    res.render("files-list", { files: sharedFolderContents.folder.files})
})

const createSharedFolderPost = [
    checkLoggedIn,
    validateCreateSharedFolder,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
        if (!errorsResult.isEmpty()) {
            const folderContents = await folderDb.getFiles(folderId);
            res.render("files-list", {
                shareFolderErrors: errorsResult.errors,
                currentFolderId: folderId,
                files: folderContents.files,
                childFolders: folderContents.childFolders,
            })
            return;
        }
        const expiresAt = new Date(Date.now() + parseInt(req.body.share_folder_duration))
            .toISOString();
        const sharedFolderDetails = await db.createSharedFolder(folderId, { expiresAt: expiresAt });
        res.redirect(`/files/share/${sharedFolderDetails.id}`);
    })
]

export { sharedFolderGet, createSharedFolderPost }