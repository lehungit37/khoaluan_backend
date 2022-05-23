const express = require("express");
const router = express.Router();
const categoriesController = require("./controller");
const validation = require("./middleware/validation");
const authentication = require("../../middleware/authentication");

router.get("/get_all", categoriesController.getAll);
router.get(
  "/get_all_by_admin",
  authentication.isAuth,
  authentication.isAdmin,
  categoriesController.getAllByAdmin
);
router.post(
  "/add",
  authentication.isAuth,
  authentication.isAdmin,
  validation.checkData,
  categoriesController.add
);
router.delete(
  "/:id",
  authentication.isAuth,
  authentication.isAdmin,
  validation.checkId,
  categoriesController.delete
);
router.put(
  "/:id",
  authentication.isAuth,
  authentication.isAdmin,
  validation.checkData,
  categoriesController.update
);

module.exports = router;
