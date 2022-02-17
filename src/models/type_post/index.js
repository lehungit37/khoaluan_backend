const { TypePost } = require("../index");
const typePostModel = {
  getAll: async () => {
    return await TypePost.findAll();
  },
  create: async (data) => {
    return await TypePost.create(data);
  }
};
module.exports = typePostModel;
