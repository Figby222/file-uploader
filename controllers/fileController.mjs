import authorizationUtils from "../lib/authorizationUtils.mjs";
const { checkLoggedIn } = authorizationUtils;

const uploadFileFormGet = [
    checkLoggedIn,
    (req, res) => {
        res.render("upload-file.ejs")
    }
]
export { uploadFileFormGet }