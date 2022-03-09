const express = require("express");
const router = express.Router();
const postController = require("./controller");
router.get(`/get_all`, postController.getAllPost);
router.post("/add_post", postController.addPost);

module.exports = router;
