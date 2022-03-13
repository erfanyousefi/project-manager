const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload")
const router = require("express").Router();

router.post("/create",fileupload(), checkLogin, uploadFile, createProjectValidator(),expressValidatorMapper, ProjectController.createProject)
module.exports = {
    projectRoutes : router
}