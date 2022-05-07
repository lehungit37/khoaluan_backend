const express = require("express");
const router = express.Router();
const userController = require("./controller");
const authentication = require("../../middleware/authentication");
const app = require("../../app");
const { checkPassword, checkAdmin } = require("./middleware");
const userMiddleware = require("./middleware");

router.get(
  "/get_all",
  authentication.isAuth,
  checkAdmin,
  userController.getAll
);
router.get("/get_info", authentication.isAuth, userController.getInfo);
router.post(
  "/add_user",
  authentication.isAuth,
  checkAdmin,
  userController.addUser
);
router.put(
  "/change_password",
  authentication.isAuth,
  checkPassword,
  userController.updatePassword
);

router.put(
  "/update_user/:id",
  authentication.isAuth,
  userController.updateUserInfo
);

router.delete(
  "/delete_user/:id",
  authentication.isAuth,
  checkAdmin,
  userController.deleteUser
);

router.post(
  "/change_avatar",
  authentication.isAuth,
  userController.changeAvatar
);
router.post(
  "/change_phoneNumber",
  authentication.isAuth,
  userController.changePhoneNumber
);

//admin
router.get(
  "/admin/get_Info",
  authentication.isAuth,
  authentication.isAdmin,
  userController.getInfo
);
module.exports = router;
