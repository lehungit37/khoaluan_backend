const { Post } = require("../index");
const { Op } = require("sequelize");

const postModel = {
  getAll: async (query) => {
    return await Post.findAll({
      offset: parseInt(query.offset) || 1,
      limit: parseInt(query.limit) || 15
    });
  },
  getByTypePost: async (typeId) => {
    return await Post.findAll({ typePostId: typeId });
  },
  addPost: async (data) => {
    return await Post.create(data);
  }
};

module.exports = postModel;
