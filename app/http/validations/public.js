const { param } = require("express-validator")

function mongoIDValidator(){
    return [
        param("id").isMongoId().withMessage("شناسه ی ارسال شده صحیح نمیباشد")
    ]
}
module.exports = {
    mongoIDValidator
}