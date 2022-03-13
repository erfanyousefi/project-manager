
class ProjectController {
  async createProject(req, res, next) {
    try {
      const {title, text } = req.body;
      
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
