const router = require("express").Router();
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator } = require("../http/validations/auth");
const {AuthController} = require("./../http/controllers/auth.controller")
router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)
module.exports = {
    authRoutes : router
}