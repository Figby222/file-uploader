import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;
import multer from "multer";
import asyncHandler from "express-async-handler";
import Path from "node:path";
import db from "../db/queries/fileQueries.mjs";

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
    asyncHandler(async (req, res) => {
        await db.createFile({
            path: req.files[0].path,
            name: req.body.file_name || "new_file",
            size: req.files[0].size
        })

        res.redirect("/");
    })
]
export { uploadFileFormGet, uploadFilePost }