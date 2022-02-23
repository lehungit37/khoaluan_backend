const postModel = require("../../../models/post");
const ShortUniqueId = require("short-unique-id");
const postController = {
  getAllPost: async (req, res) => {
    const { query } = req;
    const posts = await postModel.getAll(query);
    return res.status(200).json(posts);
  },
  getByTypePost: async (req, res) => {
    const typeId = req.params.id;
    if (!typeId) {
      return res.status(400).json({ messages: "Lỗi không đính kèm ID" });
    }
    const posts = await postModel.getByType(typeId);
    return res.status(200).json(posts);
  }
};

module.exports = postController;
