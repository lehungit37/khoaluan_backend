const { User } = require("../index");
const { Op } = require("sequelize");

const userModel = {
  getAll: async () => {
    return await User.findAll();
  },
  checkLogin: async (data) => {
    return await User.findOne({
      attributes: ["password", "userName", "permissionId", "isLock", "id"],
      where: {
        userName: data.userName,
        password: data.password
      }
    });
  },
  checkAdmin: async (id) => {
    return await User.findOne({ where: { id }, attributes: ["permissionId"] });
  },
  getInfo: async (data) => {
    return await User.findOne({
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "phoneNumber",
        "imageUrl",
        "isLock",
        "money",
        "userName"
      ],
      where: {
        userName: data.data.userName,
        password: data.data.password
      }
    });
  },

  checkUser: async ({ userName, phoneNumber, email }) => {
    return await User.findOne({
      attributes: [
        "id",
        "name",
        "address",
        "phoneNumber",
        "imageUrl",
        "isLock"
      ],
      where: {
        [Op.or]: [{ userName }, { phoneNumber }, { email }]
      }
    });
  },
  addUser: async (data) => {
    return await User.create(data);
  },
  getInfoAuthorPost: async (idList) => {
    return await User.findOne({
      where: {
        id: {
          [Op.or]: idList
        }
      },
      attributes: ["name", "phoneNumber", "imageUrl"]
    });
  },
  updatePassword: async ({ id, newPassword }) => {
    return await User.update({ password: newPassword }, { where: { id } });
  },

  updateUser: async (userUpdate) => {
    return await User.update(userUpdate, { where: { id: userUpdate.id } });
  },

  deleteUser: async (id) => {
    return await User.destroy({ where: { id } });
  },

  changeUserAvatar: async ({ id, imageUrl }) => {
    return await User.update({ imageUrl }, { where: { id } });
  },

  forgetPassword: async ({ phoneNumber, newPassword }) => {
    return await User.update(
      { password: newPassword },
      { where: { phoneNumber } }
    );
  },

  checkPhoneNumber: async (phoneNumber) => {
    return await User.findOne({ where: { phoneNumber } });
  },

  changePhoneNumber: async ({ id, phoneNumber }) => {
    return await User.update({ phoneNumber }, { where: { id } });
  }
};

module.exports = userModel;
