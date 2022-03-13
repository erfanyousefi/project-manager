const { ProjectController } = require("../http/controllers/project.controller");
const router = require("express").Router();
router.post("/create", ProjectController.createProject)
module.exports = {
    projectRoutes : router
}