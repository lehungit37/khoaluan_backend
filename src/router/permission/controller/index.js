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
      const totalData = await permissionModel.count();
      return res.status(200).json({ data: permission, totalData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  getByQuery: async (req, res) => {
    try {
      const { query } = req;

      const totalData = await permissionModel.count();
      const data = await permissionModel.getByQuery(query);

      return res.status(200).json({ totalData, data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  updatePermission: async (req, res) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const isSuccess = await permissionModel.updatePermission({ data, id });

      if (isSuccess > 0)
        return res.status(200).json({ messages: "Cập nhật thành công" });
      return res.status(400).json({ messages: "Cập nhật thất bại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};
module.exports = permissionController;
