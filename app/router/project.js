const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");
const { mongoIDValidator } = require("../http/validations/public");
const router = require("express").Router();

router.post("/create",fileupload(), checkLogin, uploadFile, createProjectValidator(),expressValidatorMapper, ProjectController.createProject)
router.get("/list", checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin,mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)
router.post("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper,ProjectController.updateProject)
module.exports = {
    projectRoutes : router
}