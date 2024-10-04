import asyncHandler from "express-async-handler";
import db from "../db/queries/sharedFolderQueries.mjs";
import { NotFoundError } from "../lib/errorUtils.mjs";
import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import { body, validationResult } from "express-validator";
import folderDb from "../db/queries/folderQueries.mjs";
import filePool from "../db/filePool.mjs";

const validateCreateSharedFolder = [
    body("share_folder_duration")
        .notEmpty().withMessage("Duration must not be empty")
        .isInt({ min: 0 }).withMessage("Duration must be a postive integer")
]

const sharedFolderGet = asyncHandler(async (req, res) => {
    const sharedFolderContents = await db.sharedFolderContentsGet(req.params.sharedFolderId);

    const currentDateTime = new Date(Date.now()).toISOString();
    const isSharedFolderExpired = currentDateTime > new Date(sharedFolderContents.expiresAt).toISOString();
    if (!sharedFolderContents || isSharedFolderExpired) {
        throw new NotFoundError("Shared Folder Not Found");
    }
    res.render("files-list", { files: sharedFolderContents.folder.files, sharedFolder: true, sharedFolderId: sharedFolderContents.id })
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

const sharedFolderFileDetailsGet = asyncHandler(async (req, res) => {
    const { sharedFolderId } = req.params;
    const fileId = req.params.fileId ? parseInt(req.params.fileId) : null;
    if (!fileId) {
        throw new NotFoundError(`Invalid file id ${fileId}`);
    }
    const { fileDetails, expiresAt } = await db.getSharedFolderFileDetails(sharedFolderId, fileId);
    const isFileExpired = new Date(Date.now()).toISOString() > new Date(expiresAt).toISOString();
    if (!fileDetails || isFileExpired) {
        throw new NotFoundError(`File with id ${fileId} in folder with shared Id ${sharedFolderId} not found`)
    }
    res.render("file-details", { file: fileDetails, sharedFolderFile: true, sharedFolderId: sharedFolderId });
})

const downloadSharedFolderFileGet = asyncHandler(async (req, res) => {
    const { sharedFolderId } = req.params;
    const fileId = req.params.fileId ? parseInt(req.params.fileId) : null;
    
    if (!fileId) {
        throw new NotFoundError(`File with id ${fileId} in folder with shared Id ${sharedFolderId} not found`);
    }

    const { fileDetails, expiresAt } = await db.getSharedFolderFileDetails(sharedFolderId, fileId);
    const isFileExpired = new Date(Date.now()).toISOString() > new Date(expiresAt).toISOString();
    
    if (isFileExpired) {
        throw new NotFoundError(`File with id ${fileId} in folder with shared Id ${sharedFolderId} not found`);
    }

    const { data, error } = await filePool.storage
        .from("myBucket")
        .createSignedUrl(fileDetails.path, 3600);

        console.log(data, error);
        console.log(fileDetails);

        res.redirect(data.signedUrl);

})

export { sharedFolderGet, createSharedFolderPost, sharedFolderFileDetailsGet, downloadSharedFolderFileGet }