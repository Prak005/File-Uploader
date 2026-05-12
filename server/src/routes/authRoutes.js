const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);

module.exports = router;