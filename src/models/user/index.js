const { User } = require("../index");
const { Op } = require("sequelize");

const userModel = {
  getAll: async () => {
    return await User.findAll();
  },
  checkLogin: async (data) => {
    return await User.findOne({
      attributes: ["password", "userName", "permissionId", "isLock"],
      where: {
        userName: data.userName,
        password: data.password,
      },
    });
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
      ],
      where: {
        userName: data.data.userName,
        password: data.data.password,
      },
    });
  },

  checkUser: async ({ userName, email, phoneNumber }) => {
    return await User.findOne({
      attributes: [
        "id",
        "name",
        "address",
        "phoneNumber",
        "imageUrl",
        "isLock",
      ],
      where: {
        [Op.or]: [{ userName }, { email }, { phoneNumber }],
      },
    });
  },
  addUser: async (data) => {
    return await User.create(data);
  },
};

module.exports = userModel;
