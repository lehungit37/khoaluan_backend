const express = require("express");
const router = express.Router();
const userController = require("./controller");
const authentication = require("../../middleware/authentication");
router.get("/get_all", authentication.isAuth, userController.getAll);
router.get("/get_info", authentication.isAuth, userController.getInfo);
router.post("/add_user", userController.addUser);

module.exports = router;
