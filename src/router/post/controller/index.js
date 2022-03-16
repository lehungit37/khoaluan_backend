const postModel = require("../../../models/post");
const relatedImageModel = require("../../../models/related_images");
const ShortUniqueId = require("short-unique-id");
const postController = {
  getAllPost: async (req, res) => {
    try {
      const { query } = req;
      const { id } = req.params; //id: type Post
      const posts = await postModel.getAll({ query, id });
      const totalData = await postModel.countPost(id);
      return res.status(200).json({ data: posts, totalData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getInfoPost: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const infoPost = await postModel.getInfoPost(id);
      if (!infoPost) {
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
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await postModel.deletePost(id);
      if (!data) {
        return res.status(400).json({ messages: "Xóa bài viết thất bại" });
      }

      return res.status(200).send("OK");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thồng" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params; // id post
      const newPost = req.body;

      const data = await postModel.updatePost({ id, newPost });
      if (!data) {
        return res.status(400).json({ messages: "Cập nhật bài viết thất bại" });
      }
      return res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thồng" });
    }
  }
};

module.exports = postController;
