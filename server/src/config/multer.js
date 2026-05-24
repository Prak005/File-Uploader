const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5*1024*1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "application/pdf",
        ];
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
});

module.exports = upload;