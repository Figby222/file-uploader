import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import multer from "multer";
import asyncHandler from "express-async-handler";
import Path from "node:path";
import db from "../db/queries/fileQueries.mjs";
import { body, validationResult } from "express-validator";

const uploadFileFormValidator = [
    body("file_name")
        .trim()
        .notEmpty().withMessage("File Name must not be empty")
        .isAlphanumeric("en-US", { ignore: /[-._]/i}).withMessage("File Name must be alphanumeric")
        .isLength({ max: 50 }).withMessage("File name must contain less than 50 characters")
]

const __dirname = import.meta.dirname;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, Path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    }
})
const upload = multer({ storage: storage });

const uploadFileFormGet = [
    checkLoggedIn,
    (req, res) => {
        res.render("upload-file.ejs")
    }
]

const uploadFilePost = [
    checkLoggedIn,
    upload.array("files"),
    uploadFileFormValidator,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            res.render("upload-file", { errors: errorsResult.errors });
            return;
        }
        await db.createFile({
            path: req.files[0].path,
            name: req.body.file_name || "new_file",
            size: req.files[0].size
        })

        res.redirect("/");
    })
]

const getFilesList = [
    checkLoggedIn,
    asyncHandler(async (req, res) => {
        const rootFolderContents = await db.getRootFolderContents();
        res.render("files-list", { files: rootFolderContents });
    })

]
export { uploadFileFormGet, uploadFilePost, getFilesList }