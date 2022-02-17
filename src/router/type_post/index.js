const typePostController = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/get_all", typePostController.getAllTypePost);
router.post("/create", typePostController.createTypePost);

module.exports = router;
