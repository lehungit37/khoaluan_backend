const { Post, RelatedImages } = require("../index");
const { Op } = require("sequelize");

const postModel = {
  getAll: async ({ query, id }) => {
    if (id !== "all") {
      return await Post.findAll({
        where: { categoryId: id },
        // include: [{ model: RelatedImages }],
        offset: parseInt(query.page) - 1 || 0,
        limit: parseInt(query.limit) || 15
      });
    } else {
      return await Post.findAll({
        // include: [{ model: RelatedImages }],
        offset: parseInt(query.page) - 1 || 0,
        limit: parseInt(query.limit) || 15
      });
    }
  },
  getInfoPost: async (id) => {
    //id: IDPost
    return await Post.findOne({
      where: { id },
      include: [{ model: RelatedImages }]
    });
  },
  getPostByUser: async ({ userId, query }) => {
    return await Post.findAll({
      where: { userId },
      include: [{ model: RelatedImages }],
      offset: parseInt(query.page) - 1 || 0,
      limit: parseInt(query.limit) || 15
    });
  },
  addPost: async (data) => {
    return await Post.create(data);
  },
  deletePost: async (id) => {
    return await Post.destroy({ where: { id } });
  },
  updatePost: async ({ id, newPost }) => {
    return await Post.update(newPost, { where: { id } });
  },
  countPost: async (id) => {
    if (id === "all") {
      return await Post.count();
    } else {
      return await Post.count({ where: { categoryId: id } });
    }
  }
};

module.exports = postModel;
