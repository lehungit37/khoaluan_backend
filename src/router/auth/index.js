const express = require("express");
const router = express.Router();
const authController = require("./controller");

router.post("/login/admin", authController.loginWithAdmin);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forget_password", authController.forgetPassword);
router.post("/authenticator", authController.authenticator);

// dùng để quên mật khẩu,
router.get(
  "/send_code_current",
  authController.checkNotPhoneNumber,
  authController.sendCode
);

//dungf để đăng ký thay đổi sdt
router.get(
  "/send_code_new",
  authController.checkHasPhoneNumber,
  authController.sendCode
);
router.get("/veryfy", authController.veryfyCode);

module.exports = router;
