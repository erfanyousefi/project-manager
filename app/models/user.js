const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    username : {type : String, required : true, unique : true},
    mobile : {type : String, required : true, unique : true},
    roles : {type : [String], default : ["USER"]},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    skills : {type : [String], default : []},
    teams : {type : [mongoose.Types.ObjectId], default : []},
}, {
    timestamps : true
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = {
    UserModel
}