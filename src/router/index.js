const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const typePostRouter = require("./type_post");
const postRouter = require("./post");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/type_post", typePostRouter);
routers.use("/post", postRouter);

module.exports = routers;
