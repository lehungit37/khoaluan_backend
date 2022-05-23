const express = require("express");
const router = express.Router();
const permissionController = require("./controller");
const authentication = require("../../middleware/authentication");

router.get(
  "/get_all",
  authentication.isAuth,
  authentication.isAdmin,
  permissionController.getAll
);
router.post(
  "/add_permission",
  authentication.isAuth,
  authentication.isAdmin,
  permissionController.add
);

router.get(
  "/get_permission",
  authentication.isAuth,
  authentication.isAdmin,
  permissionController.getByQuery
);
router.put(
  "/:id",
  authentication.isAuth,
  authentication.isAdmin,
  permissionController.updatePermission
);

module.exports = router;
