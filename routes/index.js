const express = require("express");
const router = express.Router({mergeParams: true});

router.use("/medicines", require("./medicines"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
// define the about route
router.get('/', (req, res) => {
    res.send('About birds')
  })

module.exports = router