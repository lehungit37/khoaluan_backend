const roomModel = require("../../../models/room");
const ShortUniqueId = require("short-unique-id");

const roomController = {
  getAll: async (req, res) => {
    const userId = req.params.id;
    const data = await roomModel.getAllRoom(userId);

    return res.json(data);
  },
  getInfoRoom: async (req, res) => {
    try {
      const idRoom = req.params.id;
      const data = await roomModel.getInfoRoom(idRoom);
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(200)
          .json({ messages: "Không tìm thấy thông tin phòng" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  addRoom: async (req, res) => {
    try {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();
      const room = req.body;

      const data = await roomModel.addRoom({ id, ...room });
      return res.json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = roomController;
