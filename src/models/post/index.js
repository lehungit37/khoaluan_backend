const { Post, RelatedImages } = require("../index");
const { Op } = require("sequelize");

const postModel = {
  getAllPost: async (query) => {
    for (key in query) {
      if (query[key] == "all") delete query[key];
    }

    query.price = {
      [Op.gte]: query.from,
      [Op.lt]: query.to
    };

    delete query.from;
    delete query.to;
    return await Post.findAll({
      where: query,
      attributes: [
        "address",
        "id",
        "infoConnect",
        "price",
        "rootLocation",
        "title",
        "createdAt",
        "imagePost"
      ]
    });
  },
  getAll: async ({ query, id }) => {
    if (id !== "all") {
      return await Post.findAll({
        where: { categoryId: id, status: true },
        attributes: [
          "address",
          "id",
          "infoConnect",
          "price",
          "rootLocation",
          "title",
          "createdAt",
          "imagePost"
        ]
      });
    } else {
      return await Post.findAll({
        where: { status: true },
        attributes: [
          "address",
          "id",
          "infoConnect",
          "price",
          "rootLocation",
          "title",
          "createdAt",
          "imagePost"
        ]
      });
    }
  },
  getInfoPost: async (id) => {
    //id: IDPost
    return await Post.findOne({
      where: { id },
      include: [{ model: RelatedImages, attributes: ["id", "url"] }]
    });
  },
  getPostByUser: async ({ userId, query }) => {
    return await Post.findAll({
      where: { userId },
      include: [{ model: RelatedImages, attributes: ["id", "url"] }],
      offset: parseInt(query.page) - 1 || 0,
      limit: parseInt(query.limit) || 15
    });
  },
  getLastestPost: async (id) => {
    return await Post.findAll({
      limit: 5,
      offset: 0,
      attributes: ["title", "price", "createdAt", "imagePost", "id"],
      order: [["createdAt", "DESC"]],
      where: { id: { [Op.ne]: id } }
    });
  },

  getPostByCategori: async (categoryId) => {
    return await Post.findAll({
      limit: 5,
      offset: 0,
      attributes: ["title", "price", "createdAt", "imagePost", "id"],
      order: [["createdAt", "DESC"]],
      where: {
        categoryId
      }
    });
  },
  addPost: async (data) => {
    return await Post.create(data);
  },
  deletePost: async (id) => {
    return await Post.destroy({ where: { id } });
  },
  updatePost: async ({ id, info }) => {
    return await Post.update(info, { where: { id } });
  },
  countPost: async (id) => {
    if (id === "all") {
      return await Post.count();
    } else {
      return await Post.count({ where: { categoryId: id } });
    }
  },

  countPostByUser: async (userId) => {
    return await Post.count({ where: { userId } });
  },

  hiddenPost: async (id) => {
    return await Post.update({ status: 0 }, { where: { id } });
  },
  displayPost: async (id) => {
    return await Post.update({ status: 1 }, { where: { id } });
  },

  filterByPrice: async ({ from, to }) => {
    return await Post.findAll({
      where: {
        price: {
          [Op.gte]: from, // >= 6
          [Op.lt]: to
        }
      }
    });
  },
  filterByDistrictId: async (districtId) => {
    console.log(districtId);
    return await Post.findAll({
      where: {
        districtId: `${districtId}`
      }
    });
  },

  getPostAdmin: async (query) => {
    return await Post.findAll({
      limit: parseInt(query?.limit),
      offset: parseInt(query?.page) - 1
    });
  },
  countPostAdmin: async () => {
    return await Post.count();
  },

  getPostlatestApp: async () => {
    return await Post.findAll({
      limit: 10,
      offset: 0,
      attributes: [
        "address",
        "id",
        "infoConnect",
        "price",
        "rootLocation",
        "title",
        "createdAt",
        " imagePost"
      ],
      order: [["createdAt", "DESC"]]
    });
  }
};

module.exports = postModel;
