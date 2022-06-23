const express = require("express");
const router = express.Router();

Router.use("/medicines", require("./medicines"));
Router.use("/users", require("./users"));

module.exports = Router;