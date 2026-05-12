const express = require("express");
const router = express.Router();

const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, folderController.getFolders);
router.post("/", isAuthenticated, folderController.createFolder);
router.get("/:id", isAuthenticated, folderController.getFolder);

module.exports = router;