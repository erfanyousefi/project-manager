const { ProjectModel } = require("../../models/project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const {title, text, image } = req.body;
      const owner = req.user._id
      const result = await ProjectModel.create({title, text, owner, image})
      if(!result) throw {status : 400, message : "افزودن پروژه با مشکل مواجه شد"}
      return res.status(201).json({
        status : 201,
        success: true,
        message : 'پروژه با موفقیت ایجاد شد'
      })
    } catch (error) {
      next(error)
    }
  }
  getAllProject() {}
  getProjectById() {}
  getAllProjectOfTeam() {}
  getProjectOfUser() {}
  updateProject() {}
  removeProject() {}
}
module.exports = {
  ProjectController: new ProjectController(),
};
