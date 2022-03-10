const router = require("express").Router();
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator, loginValidation } = require("../http/validations/auth");
const {AuthController} = require("./../http/controllers/auth.controller")
router.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)
router.post("/login", loginValidation(), expressValidatorMapper, AuthController.login)
module.exports = {
    authRoutes : router
}