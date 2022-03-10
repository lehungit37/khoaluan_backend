const _JWT = require("../common/_JWT");

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

module.exports = { isAuth };
