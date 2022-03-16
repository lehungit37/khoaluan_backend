const express = require("express");
const router = express.Router();
const postController = require("./controller");
router.get("/get_all/:id", postController.getAllPost);
router.get("/get_post_item/:id", postController.getInfoPost);
router.get("/get_post_by_user/:id", postController.getPostByUser);
router.post("/add_post", postController.addPost);
router.delete("/delete_post/:id", postController.deletePost);
router.put("/update_post/:id", postController.updatePost);

module.exports = router;
