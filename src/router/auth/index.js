const express = require("express");
const router = express.Router();
const authController = require("./controller");

router.post("/login/admin", authController.loginWithAdmin);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
