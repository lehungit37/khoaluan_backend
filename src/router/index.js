const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const typePostRouter = require("./type_post");
const postRouter = require("./post");
const categoriesRouter = require("./categories");
const groupTimeRouter = require("./group_time");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/type_post", typePostRouter);
routers.use("/post", postRouter);
routers.use("/categories", categoriesRouter);
routers.use("/group_time", groupTimeRouter);

module.exports = routers;
