const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const routers = require("./src/router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());-
app.use(morgan("dev"));

app.use("/api", routers);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server connect to localhost:3000");
});
