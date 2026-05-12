const express = require("express");
const router = express.Router();

const folderController = require("../controllers/folderController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

router.get("/", isAuthenticated, folderController.getFolders);
router.post("/", isAuthenticated, folderController.createFolder);
router.get("/:id", isAuthenticated, folderController.getFolder);
router.post("/:id/upload", isAuthenticated, upload.single("file"), folderController.uploadFile);
router.delete("/files/:fileId", isAuthenticated, folderController.deleteFile);

module.exports = router;