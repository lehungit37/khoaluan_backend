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
  getInfoPost: async (idPost) => {
    return await Post.findOne({
      where: { id: idPost },
      include: [{ model: RelatedImages }]
    });
  },
  getPostByUser: async ({ userId, query }) => {
    return await Post.findAll({
      where: { userId },
      // include: [{ model: RelatedImages }],
      offset: parseInt(query.page) - 1 || 0,
      limit: parseInt(query.limit) || 15
    });
  },
  addPost: async (data) => {
    return await Post.create(data);
  }
};

module.exports = postModel;
