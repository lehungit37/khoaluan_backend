const postModel = require("../../../models/post");
const relatedImageModel = require("../../../models/related_images");
const ShortUniqueId = require("short-unique-id");
const userModel = require("../../../models/user");
const postController = {
  getAllPost: async (req, res) => {
    try {
      const { query } = req;
      const { id } = req.params; //id: type Post
      const posts = await postModel.getAll({ query, id });
      return res.status(200).json({ data: posts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getInfoPost: async (req, res) => {
    try {
      const { id } = req.params;
      let infoPost = await postModel.getInfoPost(id);
      if (!infoPost) {
        return res.status(400).json({ messages: "Không tìm thấy bài viết" });
      }
      const { userId, categoryId } = infoPost;

      const infoAuthPost = await userModel.getInfoAuthorPost(userId);
      const lastestPost = await postModel.getLastestPost();
      const relatedPost = await postModel.getPostByCategori(categoryId);
      const newInfoPost = { infoPost, infoAuthPost, lastestPost, relatedPost };

      return res.status(200).json(JSON.parse(JSON.stringify(newInfoPost)));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getPostEdit: async (req, res) => {
    try {
      const { id } = req.params;
      let infoPost = await postModel.getInfoPost(id);
      if (!infoPost) {
        return res.status(400).json({ messages: "Không tìm thấy bài viết" });
      }
      return res.status(200).json(infoPost);
    } catch (error) {
      console.log(err);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  getPostByUser: async (req, res) => {
    try {
      const { query } = req;
      const { id } = req.auth.data;
      const postData = await postModel.getPostByUser({ userId: id, query });
      const totalData = await postModel.countPostByUser(id);
      return res.status(200).json({ postData, totalData });
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
      const uid = new ShortUniqueId({ length: 20 });
      const { id } = req.params; // id post
      const newPost = req.body;
      const { info, newRelatedImage, oldRelatedImage } = newPost;
      const data = await postModel.updatePost({ id, info });

      if (newRelatedImage?.length > 0) {
        const imagesList = [];
        newRelatedImage?.map((item) => {
          const imageId = uid();

          imagesList.push({ ...item, id: imageId, postId: id });
        });

        await relatedImageModel.deleteImage(id);
        await relatedImageModel.addImage(imagesList);
      }
      if (!data) {
        return res.status(400).json({ messages: "Cập nhật bài viết thất bại" });
      }
      return res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thồng" });
    }
  },

  hiddenPost: async (req, res) => {
    try {
      const { id } = req.params;
      const success = await postModel.hiddenPost(id);
      if (success) return res.status(200).json("OK");
      return res.status(400), json({ messages: "Ẩn bài thất bại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  displayPost: async (req, res) => {
    try {
      const { id } = req.params;
      const success = await postModel.displayPost(id);
      if (success) return res.status(200).json("OK");
      return res.status(400), json({ messages: "Hiển thị bài thất bại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = postController;
