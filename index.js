const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const routers = require("./src/router");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
-app.use(morgan("dev"));
app.use(express.static("public/images"));

app.use("/api", routers);

app.use("/", (req, res, next) => {
  res.status("404").json({ messages: "Not found" });
});
app.use((err, req, res, next) => {
  if (err) {
    res.statusCode = err.code || 500;
    res.json(err);
  }
  next();
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log("Server connect to localhost:3000");
});
