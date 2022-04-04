const userModel = require("../../../models/user");
const JWT = require("../../../common/_JWT");
const _JWT = require("../../../common/_JWT");

const userController = {
  getAll: async (req, res) => {
    try {
      const data = await userModel.getAll();
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  getInfo: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const data = await JWT.checkToken(token);
      if (!data) {
        return res.status(400).json({ messages: "Vui lòng đăng nhập lại" });
      }
      const info = await userModel.getInfo(data);
      if (Object.keys(info).length === 0) {
        res
          .status(400)
          .json({ messages: "Không tìm thấy thông tin người dùng" });
      } else {
        return res.status(200).json(info);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  addUser: async (req, res) => {
    try {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();

      const data = req.body;
      await userModel
        .addUser({ id, ...data })
        .then(() => {
          return res.status(200).json("OK");
        })
        .catch(() => {
          return res.status(400).json("Thêm bài viết thất bại");
        });

      return res.json("OK");
    } catch (error) {
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const { data } = req.auth;

      const success = await userModel.updatePassword({
        id: data.id,
        newPassword
      });
      if (success) {
        const newUser = { ...data, password: newPassword };
        const newToken = await _JWT.makeToken(newUser);
        req.headers.authorization = newToken;
        res.cookie("token", newToken);
        return res.status(200).json("OK");
      } else
        return res.status(400).json({ messages: "Cập nhật mật khẩu thất bại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },
  updateUserInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const userUpdate = req.body;
      userUpdate.id = id;
      const data = await userModel.updateUser(userUpdate);
      if (data) {
        return res.status(200).json("OK");
      } else {
        return res
          .status(400)
          .json({ messages: "Cập nhật thông tin thất bại" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await userModel.deleteUser(id);

      if (data) {
        return res.status(200).json("OK");
      } else {
        return res.status(400).json({ messages: "Xóa người dùng thất bại" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  },

  
};

module.exports = userController;
