const categoriesModel = require("../../../models/categories");
const ShortUniqueId = require("short-unique-id");
const helper = require("../../../common/helper");
const categoriesController = {
  getAll: async (req, res) => {
    const data = await categoriesModel.getAll();
    return res.status(200).json(data);
  },
  getAllByAdmin: async (req, res) => {
    try {
      const query = req.query;
      const data = await categoriesModel.getByAdmin(query);

      console.log(data);
      const totalData = await categoriesModel.cout();

      return res.status(200).json({ data, totalData });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Lỗi hệ thống");
    }
  },
  add: async (req, res) => {
    try {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();
      const dataSend = req.body;
      const slug = helper.stringToSlug(dataSend.nameCategories);
      const data = await categoriesModel.add({ id, slug, ...dataSend });
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
      return res.status(200).json({ data: newData });
    } else {
      return res.status(400).json({ messages: "Cập nhật thất bại" });
    }
  },

  notFound: async (req, res) => {
    return res.status(404).json({ messages: "Route not found" });
  }
};

module.exports = categoriesController;
