const _JWT = require("../common/_JWT");
const userModel = require("../models/user");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      let authData = await _JWT.checkToken(token);
      req.auth = authData;
      next();
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Vui lòng đăng nhập để thao tác" });
    }
  } else {
    return res.status(400).json({ message: "Vui lòng đăng nhập để thao tác" });
  }
};

const isAdmin = async (req, res, next) => {
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
};

module.exports = { isAuth, isAdmin };
