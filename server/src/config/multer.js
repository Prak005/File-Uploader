const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "file-uploader",
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "pdf"],
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
            "application/pdf"
        ];
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Invalid File Type"));
        }
    },
});

module.exports = upload;