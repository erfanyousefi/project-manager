const {body} = require("express-validator")
const { UserModel } = require("../../models/user")
function registerValidator(){
    return [
        body("username").custom(async (value, ctx) => {
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username : value})
                    if(user) throw "نام کاربری تکراری میباشد"
                    return true
                }
                throw "نام کاربری صحیح نمیباشد"
            }else{
                throw "نام کاربری نمیتواند خالی باشد"
            }
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد")
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "ایمیل وارد شده قبلا استفاده شده است";
            return true;
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمیباشد")
        .custom(async mobile => {
            const user = await UserModel.findOne({mobile})
            if(user) throw "شماره موبایل وارد شده قبلا استفاده شده است";
            return true;
        }),
        body("password").custom((value, ctx) => {
            if(!value) throw "رمز عبور نمیتواند خالی باشد";
            if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن یکسان نمیباشد";
            return true
        })
    ]
}

module.exports = {
    registerValidator
}