const typePostModel = require("../../../models/type_post");
const ShortUniqueId = require("short-unique-id");
const helper = require("../../../common/helper");

const typePostController = {
  getAllTypePost: async (req, res) => {
    const types = await typePostModel.getAll();
    return res.status(200).json(types);
  },
  createTypePost: async (req, res) => {
    try {
      const data = req.body;
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();
      const type = await typePostModel.create({ id, ...data });
      return res.status(200).json(type);
    } catch (error) {
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = typePostController;
