const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = Router();

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Logged in");
});

router.get("/me", isAuthenticated, authController.me);

router.post("/logout", authController.logout);

module.exports = router;