const autoBind = require("auto-bind");
const res = require("express/lib/response");
const { UserModel } = require("../../models/user");
const { TeamModel } = require("./../../models/team");
class TeamController {
  constructor() {
    autoBind(this);
  }
  async createTeam(req, res, next) {
    try {
      const { name, username, description } = req.body;
      const owner = req.user._id;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      if (!team) throw { status: 500, message: "ایجاد تیم با مشکل مواجه شد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "ایجاد تیم با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfTeam(req, res, next) {
    try {
      const teams = await TeamModel.find({});
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { status: 404, message: "تیمی یافت نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const userID = req.user._id;
      const teams = await TeamModel.find({
        $or: [{ owner: userID }, { users: userID }],
      });
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {}
  }
  async removeTeamById(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { status: 404, message: "تیمی یافت نشد" };
      const result = await TeamModel.deleteOne({ _id: teamID });
      if (result.deletedCount == 0)
        throw { status: 500, message: "حذف تیم انجام نشد مجددا تلاش کنید" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "حذف تیم با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findUserInTeam(teamID, userID) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userID }, { users: userID }],
      _id: teamID,
    });
    return !!result;
  }
  //http:anything.com/team/invite/:teamID/:username
  async inviteUserToTeam(req, res, next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;
      const team = await this.findUserInTeam(teamID, userID);
      if (!team)
        throw { status: 400, message: "تیمی جهت دعوت کردن افراد یافت نشد" };
      const user = await UserModel.findOne({ username });
      if (!user)
        throw {
          status: 400,
          message: "کاربر مورد نظر جهت دعوت به تیم یافت نشد",
        };
      const userInvited = await this.findUserInTeam(teamID, user._id);
      if (userInvited)
        throw {
          status: 400,
          message: "کاربر مورد نظر قبلا به تیم دعوت شده است",
        };
      const request = {
        caller: req.user.username,
        requestDate: new Date(),
        teamID,
        status: "pending",
      };
      const updateUserResult = await UserModel.updateOne(
        { username },
        {
          $push: { inviteRequests: request },
        }
      );
      if (updateUserResult.modifiedCount == 0)
        throw { status: 500, message: "ثبت درخواست دعوت ثبت نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ثبت درخواست با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(req, res, next) {
    try {
      console.log(req.body);
      const data = { ...req.body };
      Object.keys(data).forEach((key) => {
        if (!data[key]) delete data[key];
        if (["", " ", undefined, null, NaN].includes(data[key]))
          delete data[key];
      });
      const userID = req.user._id;
      const { teamID } = req.params;
      const team = await TeamModel.findOne({ owner: userID, _id: teamID });
      if (!team) throw { status: 404, message: "تیمی با این مشخصات یافت نشد" };
      const teamEditResult = await TeamModel.updateOne(
        { _id: teamID },
        { $set: data }
      );
      if (teamEditResult.modifiedCount == 0)
        throw { status: 500, message: "به روز رسانی مشخصات تیم انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "به روز رسانی با موفقیت انجام شد",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  removeUserFromTeam() {}
}

module.exports = {
  TeamController: new TeamController(),
};
