const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
}
function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : "365 days"})
    return token
}
module.exports = {
    hashString,
    tokenGenerator
}