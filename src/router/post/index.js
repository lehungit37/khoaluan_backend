const express = require("express");
const router = express.Router();
const postController = require("./controller");
router.get(`/get_all`, postController.getAllPost);

module.exports = router;
