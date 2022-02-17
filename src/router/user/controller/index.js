const userModel = require("../../../models/user");
const ShortUniqueId = require("short-unique-id");
const JWT = require("../../../common/_JWT");

const userController = {
  getAll: async (req, res) => {
    try {
      const data = await userModel.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  getInfo: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const data = await JWT.checkToken(token);
      const info = await userModel.getInfo(data);
      if (Object.keys(info).length === 0) {
        res
          .status(400)
          .json({ messages: "Không tìm thấy thông tin người dùng" });
      } else {
        res.status(200).json(info);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  addUser: async (req, res) => {
    const uid = new ShortUniqueId({ length: 20 });
    const id = uid();

    const data = req.body;
    await userModel.addUser({ id, ...data });
    return res.json("OK");
  }
};

module.exports = userController;
