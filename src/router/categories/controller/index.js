const categoriesModel = require("../../../models/categories");
const ShortUniqueId = require("short-unique-id");
const categoriesController = {
  getAll: async (req, res) => {
    const data = await categoriesModel.getAll();
    return res.status(200).json(data);
  },
  add: async (req, res) => {
    try {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();
      const dataSend = req.body;
      const data = await categoriesModel.add({ id, ...dataSend });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json("Lỗi hệ thống");
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const isSuccess = await categoriesModel.delete(id);
      if (isSuccess) {
        return res.status(200).json({ messages: "Xóa danh mục thành công" });
      } else {
        return res.status(400).json({ messages: "Xóa danh mục thất bại" });
      }
    } catch (error) {
      return res.status(500).json("Lỗi hệ thống");
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const dataSend = req.body;
    const newData = await categoriesModel.update({ id, dataSend });
    if (newData[0] > 0) {
      return res.status(200).json({ messages: "Cập nhật thành công" });
    } else {
      return res.status(400).json({ messages: "Cập nhật thất bại" });
    }
  },
  notFound: async (req, res) => {
    return res.status(404).json({ messages: "Route not found" });
  }
};

module.exports = categoriesController;