const express = require("express");
const router = express.Router({ mergeParams: true });

require("dotenv").config();

router.use("/medicines", require("./medicines"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/category", require("./category"));
router.use("/verification", require("./verification"));
// define the about route

module.exports = router;
