const { fileUpload } = require("../../utility/multer_fileUpload");


function uploadFile(req, res, next) {
    let upload = fileUpload("images", ["image/jpeg", "image/jpg", "image/png"], 1000000, "Only jpeg, jpg and png file is allowed for upload")

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    images: {
                        msg: "File is not uploaded succesfully"
                    }
                }
            })
        } else {
            next();
        }
    })
}

module.exports = {
    uploadFile
}