const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const typePostRouter = require("./type_post");
const postRouter = require("./post");
const categoriesRouter = require("./categories");
const groupTimeRouter = require("./group_time");
const permissionRouter = require("./permission");
const imageRouter = require("./image");
const placeRouter = require("./place");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/type_post", typePostRouter);
routers.use("/post", postRouter);
routers.use("/categories", categoriesRouter);
routers.use("/group_time", groupTimeRouter);
routers.use("/permission", permissionRouter);
routers.use("/images", imageRouter);
routers.use("/place", placeRouter);

module.exports = routers;
