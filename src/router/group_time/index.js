const express = require("express");
const router = express.Router();
const groupTimeController = require("./controller");

router.get("/get_all", groupTimeController.getAll);
router.post("/add", groupTimeController.add);
router.put("/update", groupTimeController.update);
router.delete("/delete", groupTimeController.delete);
module.exports = router;
