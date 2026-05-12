const express = require("express");
const router = express.Router();

const { createFolder } = require("../controllers/folderController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, createFolder);

module.exports = router;