const { UserModel } = require("../../models/user");
const { createLinkForFiles } = require("../../modules/functions");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image = createLinkForFiles(user.profile_image, req);
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = { ...req.body };
      const userID = req.user._id;
      let fields = ["first_name", "last_name", "skills"];
      let badValues = ["", " ", null, undefined, 0, -1, NaN, [], {}];
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value);
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      console.log(data);
      const result = await UserModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          succerss: true,
          message: "به روز رسانی پروفایل با موفقیت انجام شد",
        });
      }
      throw { status: 400, message: "به روز رسانی انجام نشد" };
    } catch (error) {
      next(error);
    }
  }
  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      const filePath = req.file?.path?.substring(7);
      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "به روزرسانی انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "به روز رسانی با موفقیت امجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllRequest(req, res, next) {
    try {
      const userID = req.user._id;
      const { inviteRequests } = await UserModel.findOne(
        { _id: userID },
        { inviteRequests: 1 }
      );
      return res.json({
        requests: inviteRequests || [],
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequestsByStatus(req, res, next) {
    try {
      const { status } = req.params;
      const userID = req.user._id;
      const requests = await UserModel.aggregate([
        {
          $match: { _id: userID },
        },
        {
          $project: {
            inviteRequests: 1,
            _id: 0,
            inviteRequests : {
                $filter : {
                    input : "$inviteRequests",
                    as : "request",
                    cond : {
                        $eq : ["$$request.status", status]
                    }
                }
            }
          },
        },
      ]);
      return res.status(200).json({
        status: 200,
        success: true,
        requests : requests?.[0]?.inviteRequests || []
      });
    } catch (error) {
      next(error);
    }
  }
  async changeStatusRequest(req, res, next) {
      try {
          const {id, status} = req.params;
          const request = await UserModel.findOne({"inviteRequests._id" : id})
          if(!request) throw {status : 404, message : "درخواستی با این مشخصات یافت نشد"}
          const findRequest = request.inviteRequests.find(item => item.id == id);
          if(findRequest.status !== "pending") throw {status : 400, message : "این درخواست قبلا رد یا پذیرفته شده است"}
          if(!["accepted", "rejected"].includes(status)) throw {status : 400, message : "اطلاعات ارسال شده صحیح نمیباشد"}
          const updateResult = await UserModel.updateOne({"inviteRequests._id" : id}, {
              $set : {"inviteRequests.$.status" : status}
          })
          if(updateResult.modifiedCount == 0) throw {status : 500, message : "تغییر وضعیت درخواست انجام نشد"}
          return res.status(200).json({
              status : 200,
              success : true,
              message : "تغییر وضعیت درخواست با موفقیت انجام شد"
          })
        } catch (error) {
        next(error)
      }
  }
}
module.exports = {
  UserController: new UserController(),
};
