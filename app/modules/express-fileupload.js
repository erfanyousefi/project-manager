const fileupload = require("express-fileupload");
const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req, res, next) => {
    try {
        if(req.file || Object.keys(req.files).length == 0) throw {status : 400, message : "تصویر شاخص پروژه را ارسال نمایید"}
        let image = req.files.image
        const image_path =  path.join(createUploadPath(), (Date.now() + path.extname(image.name)))
        req.body.image = image_path
        let uploadPath = path.join(__dirname, "..", "..", image_path);
        console.log(uploadPath)
        image.mv(uploadPath, (err) => {
            console.log(err)
            if(err) throw {status : 500, message : "بارگذاری تصویر انجام نشد"}
            next();
    })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    uploadFile
}
