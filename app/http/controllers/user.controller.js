const { json } = require("express/lib/response");
const res = require("express/lib/response");
const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            user.profile_image = req.protocol + "://" + req.get("host")+ "/" + (user.profile_image.replace(/[\\\\]/gm, "/"));
            return res.status(200).json({
                status : 200, 
                success : true, 
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next){
        try {
            let data ={...req.body};
            const userID = req.user._id
            let fields = ["first_name", "last_name", "skills"]
            let badValues = ["", " ", null, undefined, 0, -1, NaN, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                console.log(key, value)
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key];
            })
            console.log(data);
            const result = await UserModel.updateOne({_id : userID}, {$set : data})
            if(result.modifiedCount > 0) {
                return res.status(200).json({
                    status : 200,
                    succerss : true,
                    message : "به روز رسانی پروفایل با موفقیت انجام شد"
                })
            }
            throw {status : 400, message : "به روز رسانی انجام نشد"}
        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user._id
            const filePath = req.file?.path?.substring(7);
            const result = await UserModel.updateOne({_id : userID}, {$set : {profile_image : filePath}});
            if(result.modifiedCount == 0) throw {status : 400, message : "به روزرسانی انجام نشد"}
            return res.status(200).json({
                status : 200, 
                success :true, 
                message : "به روز رسانی با موفقیت امجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    acceptInvitInTeam(){

    }
    rejectInviteInTeam(){

    }

}
module.exports ={
    UserController : new UserController()
}