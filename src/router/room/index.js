const express = require("express");
const router = express.Router();
const roomController = require("./controller");

//id: idUser
router.get("/get_all/:id", roomController.getAll);
router.get("/get_info/:id", roomController.getInfoRoom);
router.post("/add_room", roomController.addRoom);

router.get("*", (req, res) => {
  res.status(404).json({ messages: "Router Not Found" });
});
module.exports = router;
