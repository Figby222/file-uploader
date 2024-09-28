function checkLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/log-in");
        return;
    }

    next();
}

export default { checkLoggedIn };