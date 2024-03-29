const express = require("express");
const router = express.Router();
const postController = require("./controller");
const authentication = require("../../middleware/authentication");

router.get("/get_all_post", postController.getPost);
router.get("/get_post_by_categories/:id", postController.getAllPost);
router.get("/get_post_item/:id", postController.getInfoPost);
router.get(
  "/get_post_by_user/:id",
  authentication.isAuth,
  postController.getPostByUser
);

router.post("/add_post", authentication.isAuth, postController.addPost);
router.delete(
  "/delete_post/:id",
  authentication.isAuth,
  postController.deletePost
);
router.put(
  "/update_post/:id",
  authentication.isAuth,
  postController.updatePost
);

router.get("/hidden_post/:id", postController.hiddenPost);
router.get("/display_post/:id", postController.displayPost);
router.get("/get_info_edit/:id", postController.getPostEdit);
router.post("/filter_by_price", postController.filterByPrice);
router.post("/filter_by_district", postController.filterByDistrict);

router.get("/get_post_admin", postController.getPostByAdmin);
router.get("/get_post_lastest_app", postController.getPostLastestApp);
router.get("/get_detail_post/:id", postController.getInfoDetailPost);
module.exports = router;
