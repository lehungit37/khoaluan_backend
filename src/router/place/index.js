const express = require("express");
const router = express.Router();
const placeController = require("./controller");

router.get("/city", placeController.getDistrict);

module.exports = router;
