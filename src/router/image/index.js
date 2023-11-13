const express = require("express");
const router = express.Router();
const imageController = require("./controller");

router.post("/upload", imageController.uploadImage);
router.post(
  "/multiple_upload",

  imageController.uploadMultipleImage
);
router.get("/:name", imageController.sendFile);

module.exports = router;
