const postModel = require("../../../models/post");
const ShortUniqueId = require("short-unique-id");
const postController = {
  getAllPost: async (req, res) => {
    try {
      const { query } = req;
      const posts = await postModel.getAll(query);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  getByTypePost: async (req, res) => {
    try {
      const typeId = req.params.id;
      if (!typeId) {
        return res.status(400).json({ messages: "Lỗi không đính kèm ID" });
      }
      const posts = await postModel.getByType(typeId);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  addPost: async (req, res) => {
    // try {
    //   const data = req.body;
    //   const uid = new ShortUniqueId({ length: 20 });
    //   const id = uid();
    //   const post = await postModel.addPost({ id, ...data });
    //   if (post) {
    //     return res.status(200).json(post);
    //   } else {
    //     return res.status(400).json({ messages: "Thêm bài dăng thất bại" });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json({ messages: "Lỗi hệ thống" });
    // }

    console.log(req);
  }
};

module.exports = postController;
