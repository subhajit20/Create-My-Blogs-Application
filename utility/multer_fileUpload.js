const multer = require("multer");
const path = require("path");
const createError = require("http-errors")

function fileUpload(subfolder_path, image_mimetype, max_fileSize, error_msg) {
    const upload_folder = path.join(__dirname, `../public/uploads/${subfolder_path}`);
    let upload = multer({
        storage: upload_folder,
        limits: {
            fileSize: max_fileSize
        },
        fileFilter: (req, file, cb) => {
            if (image_mimetype.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg))
            }
        }
    })

    return upload;
}

module.exports = {
    fileUpload
}