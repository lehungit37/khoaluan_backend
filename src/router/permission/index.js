const express = require("express");
const router = express.Router();
const permissionController = require("./controller");

router.get("/get_all", permissionController.getAll);
router.post("/add_permission", permissionController.add);

module.exports = router;
