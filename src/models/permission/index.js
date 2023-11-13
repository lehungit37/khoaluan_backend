const { Permission } = require("../index");
const permissionModel = {
  addPermission: async (data) => {
    return await Permission.create(data);
  },
  getPermission: async () => {
    return await Permission.findAll();
  },
  count: async () => {
    return await Permission.count();
  },
  getByQuery: async (query) => {
    return Permission.findAll({
      limit: parseInt(query.limit),
      offset: parseInt(query.page) - 1
    });
  },
  updatePermission: async ({ data, id }) => {
    return await Permission.update(data, { where: { id } });
  }
};

module.exports = permissionModel;
