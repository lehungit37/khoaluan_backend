const permissionModel = require("../../../models/permission");
const permissionController = {
  getAll: async (req, res) => {
    try {
      const permission = await permissionModel.getPermission();
      return res.status(200).json(permission);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  add: async (req, res) => {
    try {
      const data = req.body;
      const permission = await permissionModel.addPermission(data);
      return res.status(200).json(permission);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
};
module.exports = permissionController;
