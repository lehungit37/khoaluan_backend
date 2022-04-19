const express = require("express");
const router = express.Router();
const authController = require("./controller");

router.post("/login/admin", authController.loginWithAdmin);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forget_password", authController.forgetPassword);
router.post("/authenticator", authController.authenticator);
router.get("/send_code", authController.sendCode);
router.get("/veryfy", authController.veryfyCode);

module.exports = router;
