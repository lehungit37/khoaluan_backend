const userModel = require("../../../models/user");
const ShortUniqueId = require("short-unique-id");
const _JWT = require("../../../common/_JWT");

const authController = {
  login: async (req, res) => {
    const data = req.body;
    const user = await userModel.checkLogin(data);
    if (user) {
      const newToken = await _JWT.makeToken(data);
      return res.status(200).json({ token: newToken });
    } else {
      return res.status(400).json({
        messages:
          "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng đăng nhập lại"
      });
    }
  },
  register: async (req, res) => {
    const data = req.body;

    const user = await userModel.checkUser(data.userName);
    if (user) {
      return res.json({ messages: "Tài khoản đã tồn tại, vui lòng nhập lại" });
    } else {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();

      try {
        const newUser = await userModel.addUser({ id, ...data });
        return res.json({ messages: "Đăng ký thành công", data: newUser });
      } catch (error) {
        return res.status(500).json({ messages: "Lỗi hệ thống" });
      }
    }
  }
};

module.exports = authController;
