const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const roomRouter = require("./room");
const typePostRouter = require("./type_post");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/rooms", roomRouter);
routers.use("/type_post", typePostRouter);

module.exports = routers;
