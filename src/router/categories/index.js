const express = require("express");
const router = express.Router();
const categoriesController = require("./controller");
const validation = require("./middleware/validation");

router.get("/get_all", categoriesController.getAll);
router.post("/add", validation.checkData, categoriesController.add);
router.delete("/:id", validation.checkId, categoriesController.delete);
router.put("/:id", categoriesController.update);

router.get("/*", categoriesController.notFound);
router.post("/*", categoriesController.notFound);
router.delete("/*", categoriesController.notFound);
router.put("/*", categoriesController.notFound);
module.exports = router;
