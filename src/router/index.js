const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const postRouter = require("./post");
const categoriesRouter = require("./categories");
const permissionRouter = require("./permission");
const imageRouter = require("./image");
const placeRouter = require("./place");

const routers = express.Router();

routers.use("/user", userRouter);
routers.use("/auth", authRouter);
routers.use("/post", postRouter);
routers.use("/categories", categoriesRouter);
routers.use("/permission", permissionRouter);
routers.use("/images", imageRouter);    
routers.use("/place", placeRouter);

module.exports = routers;
