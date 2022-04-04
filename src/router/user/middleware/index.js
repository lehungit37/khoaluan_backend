const userModel = require("../../../models/user");
const userMiddleware = {
  checkPassword: async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    console.log({
      user: req.auth,
      currentPassword
    });
    console.log(req.auth);

    if (currentPassword === req.auth.data.password) {
      if (currentPassword === newPassword) {
        return res
          .status(400)
          .json({ messages: "Mật khẩu trùng nhau, vui lòng nhập lại" });
      }
      next();
    } else {
      return res.status(400).json({ messages: "Mật khẩu cũ không đúng" });
    }
  },
  checkAdmin: async (req, res, next) => {
    try {
      const { id } = req.auth.data;
      const { permissionId } = await userModel.checkAdmin(id);
      if (permissionId === "admin") next();
      else {
        return res.status(400).json({ messages: "Không có quyền truy cập" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Lỗi hệ thống");
    }
  }
};

module.exports = userMiddleware;
