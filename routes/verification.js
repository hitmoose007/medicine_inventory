const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.get("/:token", async (req, res) => {
  try {
    const decoded = await jwt.verify(
      req.params.token,
      process.env.VERIFICATION_TOKEN_SECRET
    );
    
    prisma.user
      .update({
        where: {
          id: decoded.user,
        },
        data: {
          isVerified: true,
        },
      })
      .then((user) => {
        res.json({
          message: "User verified",
        });
      })

  } catch (e) {
    res.send("error");
  }
});

module.exports = router;
