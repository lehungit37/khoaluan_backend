const { GroupTime } = require("../index");

const groupTimeModel = {
  getAll: async () => {
    return await GroupTime.findAll({ order: [["createdAt", "ASC"]] });
  },
  add: async (data) => {
    return await GroupTime.create(data);
  },
  delete: async (id) => {
    return await GroupTime.destroy({ where: { id } });
  },
  update: async ({ id, data }) => {
    return await GroupTime.update(data, { where: { id } });
  }
};
module.exports = groupTimeModel;
