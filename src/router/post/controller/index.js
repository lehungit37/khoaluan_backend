const postModel = require("../../../models/post");
const relatedImageModel = require("../../../models/related_images");
const ShortUniqueId = require("short-unique-id");
const postController = {
  getAllPost: async (req, res) => {
    try {
      const { query } = req;
      const { id } = req.params;
      const posts = await postModel.getAll({ query, id });
      console.log(posts);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getInfoPost: async (req, res) => {
    try {
      const { id } = req.params;
      const infoPost = await postModel.getInfoPost(id);
      if (Object.keys(infoPost).length === 0) {
        return res.status(400).json({ messages: "Không tìm thấy bài viết" });
      }
      return res.status(200).json(infoPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getPostByUser: async (req, res) => {
    try {
      const { query } = req;
      const { id } = req.params;
      const infoPost = await postModel.getPostByUser({ userId: id, query });
      return res.status(200).json(infoPost);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  addPost: async (req, res) => {
    try {
      const { info, relatedImages } = req.body;

      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();

      const post = await postModel.addPost({ id, ...info });

      if (post) {
        if (relatedImages.length !== 0) {
          const imageList = [];
          relatedImages?.map((item) => {
            const idImage = uid();
            imageList.push({ ...item, id: idImage, postId: id });
          });
          await relatedImageModel.addImage(imageList);
          return res.status(200).json({ messages: "Thêm bài viết thành công" });
        } else {
          return res.status(200).json({ messages: "Thêm bài viết thành công" });
        }
      } else {
        return res.status(400).json({ messages: "Thêm bài viết thất bại" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = postController;
