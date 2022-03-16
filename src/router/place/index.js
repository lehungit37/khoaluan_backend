const express = require("express");
const router = express.Router();
const placeController = require("./controller");

router.get("/city", placeController.getDistrict);
router.post("/geocoder", placeController.getGeoCoder);

module.exports = router;
