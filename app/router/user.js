const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { imageValidator } = require("../http/validations/user");
const { upload_multer } = require("../modules/multer");

const router = require("express").Router();
router.get("/profile", checkLogin, UserController.getProfile)
router.post("/profile", checkLogin, UserController.editProfile)
router.post("/profile-image", 
    upload_multer.single("image"),
    imageValidator(), expressValidatorMapper,
    checkLogin, UserController.uploadProfileImage)
    router.get("/requests", checkLogin, UserController.getAllRequest)
    router.get("/requests/:status", checkLogin, UserController.getRequestsByStatus)
    router.get("/change-status-request/:id/:status", checkLogin, UserController.changeStatusRequest)
module.exports = {
    userRoutes : router
}