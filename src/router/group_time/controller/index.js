const groupTimeModel = require("../../../models/group_time");
const ShortUniqueId = require("short-unique-id");
const groupTimeController = {
  getAll: async (req, res) => {
    try {
      const data = await groupTimeModel.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  add: async (req, res) => {
    try {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();
      const data = req.body;
      const newData = await groupTimeModel.add({ id, ...data });
      return res.status(200).json(newData);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const isSuccess = await groupTimeModel.delete(id);
      if (isSuccess) {
        res.status(200).json({ messages: "Xóa thành công" });
      } else {
        res.status(400).json({ messages: "Xóa thất bại" });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const isSuccess = await groupTimeModel.update({ id, data });
      if (isSuccess[0] > 0) {
        return res.status(200).json({ messages: "Cập nhật thành công" });
      } else {
        return res.status(404).json({ messages: "Cập nhật thất bại" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = groupTimeController;
