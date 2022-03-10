const { Permission } = require("../index");
const permissionModel = {
  addPermission: async (data) => {
    return await Permission.create(data);
  },
  getPermission: async () => {
    return await Permission.findAll();
  }
};

module.exports = permissionModel;
