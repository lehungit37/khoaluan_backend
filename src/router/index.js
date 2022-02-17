const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const roomRouter = require("./room");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/rooms", roomRouter);

module.exports = routers;
