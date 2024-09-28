import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import db from "../db/queries/userQueries.mjs";
import { genPasswordHash } from "../lib/passwordHashingUtils.mjs";

const validateUserSignUp = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username must not be empty")
        .isEmail().withMessage("Username must be formatted like an email ex: example@example.com")
        .isLength({ max: 255 }).withMessage("Username must contain a maximum of 255 characters")
        .custom(async (username) => {
            const usernameAvailable = !await db.findUserByUsername(username);

            if (!usernameAvailable) {
                throw new Error("Username already taken");
            }

            return true;
        }).withMessage("Username already taken"),
    body("password")
        .notEmpty().withMessage("Password must not be empty")
        .isLength({ min: 6, max: 50 }).withMessage("Password must contain between 6 & 50 characters"),
    body("confirm_password")
        .custom((confirmPassword, { req }) => {
            return confirmPassword === req.body.password;
        }).withMessage("Confirm Password must be the same as Password")
]

function indexRouteGet(req, res) {
    res.render("index", { title: "Node Template" });
}

function signUpFormGet(req, res) {
    res.render("sign-up-form");
}

const signUpPost = [
    validateUserSignUp,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);

        if (!errorsResult.isEmpty()) {
            res.render("sign-up-form", { username: req.body.username, errors: errorsResult.errors });
            return;
        }

        const hashedPassword = await genPasswordHash(req.body.password);

        await db.createUser({
            username: req.body.username,
            hashedPassword: hashedPassword
        })

        res.redirect("/log-in");
    }) 
]

function logInFormGet(req, res) {
    res.render("log-in-form");
}


export { indexRouteGet, signUpFormGet, signUpPost, logInFormGet };