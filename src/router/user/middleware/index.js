const userModel = require("../../../models/user");
const userMiddleware = {
  checkPassword: async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    console.log({
      user: req.auth,
      currentPassword
    });

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
  checkAdmin: async (req, res, next) => {}
};

module.exports = userMiddleware;
