const { Room } = require("../index");
const { Op } = require("sequelize");

const roomModel = {
  getAllRoom: async (userId) => {
    return await Room.findAll({ where: { userId } });
  },
  getInfoRoom: async (roomId) => {
    return await Room.findOne({ where: { id: roomId } });
  },
  addRoom: async (room) => {
    return await Room.create(room);
  }
};

module.exports = roomModel;
