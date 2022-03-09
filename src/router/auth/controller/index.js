const userModel = require("../../../models/user");
const ShortUniqueId = require("short-unique-id");
const _JWT = require("../../../common/_JWT");

const authController = {
  login: async (req, res) => {
    const data = req.body;
    const user = await userModel.checkLogin(data);
    if (user) {
      if (user.isLock) {
        return res.status(400).json({
          messages: "Tài khoản của bạn đang bị tạm khoá. Vui lòng quay lại "
        });
      } else {
        const newToken = await _JWT.makeToken(data);
        req.headers.authorization = newToken;
        return res.status(200).json({ token: newToken });
      }
    } else {
      return res.status(400).json({
        messages:
          "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng đăng nhập lại"
      });
    }
  },
  register: async (req, res) => {
    const data = req.body;

    const user = await userModel.checkUser({
      userName: data.userName
    });
    if (user) {
      return res
        .status(400)
        .json({ messages: "Tên đăng nhập đã tồn tại, vui lòng nhập lại" });
    } else {
      const uid = new ShortUniqueId({ length: 20 });
      const id = uid();

      try {
        const newUser = await userModel.addUser({ id, ...data });
        return res.json({ messages: "Đăng ký thành công", data: newUser });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ messages: "Lỗi hệ thống" });
      }
    }
  },
  loginWithAdmin: async (req, res) => {
    try {
      const data = req.body;
      if (Object.keys(data).length === 0) {
        return res
          .status(400)
          .json({ messages: "Dữ liệu bị sai. Vui lòng thử lại" });
      }
      const user = await userModel.checkLogin(data);
      if (user) {
        if (user.permissionId === "admin") {
          const newToken = await _JWT.makeToken(data);
          return res.status(200).json({ token: newToken });
        } else {
          return res
            .status(400)
            .json({ message: "Bạn không có quyền truy cập" });
        }
      } else {
        return res.status(400).json({
          messages:
            "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng đăng nhập lại"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messages: "Lỗi hệ thống" });
    }
  }
};

module.exports = authController;
