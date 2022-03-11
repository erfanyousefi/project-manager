const { json } = require("express/lib/response");
const res = require("express/lib/response");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                status : 200, 
                success : true, 
                user
            })
        } catch (error) {
            next(error)
        }
    }
    editProfile(){

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