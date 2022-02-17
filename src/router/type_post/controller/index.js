const typePostModel = require("../../../models/type_post");
const ShortUniqueId = require("short-unique-id");
const helper = require("../../../common/helper");

const typePostController = {
  getAllTypePost: async (req, res) => {
    const types = await typePostModel.getAll();
    return res.status(200).json(types);
  },
  createTypePost: async (req, res) => {
    const data = req.body;
    const uid = new ShortUniqueId({ length: 20 });
    const id = uid();
    const slug = helper.stringToSlug(data.name);
    const type = await typePostModel.create({ id, slug, ...data });
    return res.status(200).json(type);
  }
};

module.exports = typePostController;
