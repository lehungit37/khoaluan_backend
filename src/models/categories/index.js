const { Categories, Post, RelatedImages } = require("../index");

const categoriesModel = {
  getAll: async () => {
    return await Categories.findAll({
      // attributes: ["id", "nameCategories, slug"],
      order: [["createdAt", "ASC"]]
    });
  },

  getByAdmin: async (query) => {
    return await Categories.findAll({
      offset: parseInt(query.page) - 1 || 0,
      limit: parseInt(query.limit) || 15,
      order: [["createdAt", "ASC"]]
    });
  },

  cout: async () => {
    return await Categories.count();
  },

  add: async (dataSend) => {
    return await Categories.create(dataSend);
  },
  delete: async (id) => {
    return await Categories.destroy({
      where: { id }
    });
  },
  update: async ({ id, dataSend }) => {
    return await Categories.update(dataSend, { where: { id } });
  }
};

module.exports = categoriesModel;
