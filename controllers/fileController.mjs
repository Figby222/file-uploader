import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import multer from "multer";
import asyncHandler from "express-async-handler";
import Path from "node:path";
import db from "../db/queries/fileQueries.mjs";
import { body, validationResult } from "express-validator";
import filePool from "../db/filePool.mjs";

const uploadFileFormValidator = [
    body("file_name")
        .trim()
        .notEmpty().withMessage("File Name must not be empty")
        .isAlphanumeric("en-US", { ignore: /[-._]/i}).withMessage("File Name must be alphanumeric")
        .isLength({ max: 50 }).withMessage("File name must contain less than 50 characters")
]

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const uploadFileFormGet = [
    checkLoggedIn,
    (req, res) => {
        const folderId = req.params.folderId ? req.params.folderId : "";
        res.render("upload-file.ejs", { folderId: folderId })
    }
]
const uploadFilePost = [
    checkLoggedIn,
    upload.array("files"),
    uploadFileFormValidator,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            res.render("upload-file", { errors: errorsResult.errors, folderId: req.params.folderId ? req.params.folderId : "" });
            return;
        }

        const file = req.files[0];

        const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const fileName = file.fieldname + "-" + uniqueSuffix + "-" + file.originalname

        const filePath = folderId ? 
            `public/${folderId}/${fileName}` :
            `public/${fileName}`;

        const { data, error } = await 
            filePool.storage.from("myBucket")
            .upload(filePath, file)

        await db.createFile({
            path: data.fullPath,
            name: req.body.file_name || "new_file",
            size: req.files[0].size,
            folderId: folderId
        })

        const redirectLink = folderId ? `/files/folders/${folderId}` : `/files`;
        res.redirect(redirectLink);
    })
]
const filesListGet = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const rootFolderContents = await db.getRootFolderContents();
        res.render("files-list", { files: rootFolderContents.files, childFolders: rootFolderContents.folders });
    })

]

const fileDetailsGet = [
    checkLoggedIn,
    asyncHandler(async(req, res) => {
        const fileId = parseInt(req.params.fileId);
        const fileDetails = await db.getFileDetails(fileId);
    
        res.render("file-details", { file: fileDetails })
    })
]

const downloadFileGet = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const fileId = parseInt(req.params.fileId);
        const fileDetails = await db.getFileDetails(fileId);
    
        res.download(fileDetails.path, fileDetails.name);
    })
]


export { uploadFileFormGet, uploadFilePost, filesListGet, fileDetailsGet, downloadFileGet }