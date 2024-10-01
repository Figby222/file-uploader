import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import db from "../db/queries/folderQueries.mjs";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

const validateNewFolder = [
    body("folder_name")
        .trim()
        .notEmpty().withMessage("Folder Name must not be empty")
        .isAlphanumeric("en-US", { ignore: /[-_]/i }).withMessage("Folder Name must be alphanumeric")
        .isLength({ max: 50 }).withMessage("Folder Name must contain a maximum of 50 characters")
]

const getFiles = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const folderContents = await db.getFiles(parseInt(req.params.folderId));
        res.render("files-list", { currentFolderId: req.params.folderId, files: folderContents.files, childFolders: folderContents.childFolders})
    })
]

const createFolderPost = [
    checkLoggedIn,
    validateNewFolder,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        const parentFolderId = req.params.folderId === 0 ? null : parseInt(req.params.folderId);
        if (!errorsResult.isEmpty()) {
            const folderContents = await db.getFiles(parentFolderId);
            res.render("files-list", { 
                errors: errorsResult.errors, 
                currentFolderId: parentFolderId, 
                files: folderContents.files, 
                childFolders: folderContents.childFolders 
            })
            return;
        }
    
        await db.createFolder({
            folder_name: req.body.folder_name,
            parentFolderId: parentFolderId
        })
        
        const redirectLink = parentFolderId ? 
            `/files/folders/${parentFolderId}` :
            `/files`;

        res.redirect(redirectLink)
    })
]

const renameFolderFormGet = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const folderId = parseInt(req.params.folderId)
        const folderDetails = await db.getFolderDetails(folderId);
        res.render("rename-folder", { folder: folderDetails });
    })
]

const renameFolderPost = [
    checkLoggedIn,
    validateNewFolder,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        const folderId = parseInt(req.params.folderId);
        const folderDetails = await db.getFolderDetails(folderId);
        if (!errorsResult.isEmpty()) {
            res.render("rename-folder", { errors: errorsResult.errors, folder: folderDetails });
            return;
        }
        
        await db.updateFolder(folderId, {
            folder_name: req.body.folder_name
        })
    
    
        const redirectLink = folderDetails.parentFolderId ?
            `/files/folders/${folderDetails.parentFolderId}` :
            `/files`;
    
        res.redirect(redirectLink);
    })
]




export { getFiles, createFolderPost, renameFolderFormGet, renameFolderPost }