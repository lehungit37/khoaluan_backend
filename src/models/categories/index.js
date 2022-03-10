const { Categories } = require("../index");

const categoriesModel = {
  getAll: async () => {
    return await Categories.findAll({
      // attributes: ["id", "nameCategories, slug"],
      order: [["createdAt", "ASC"]]
    });
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
