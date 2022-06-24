const express = require("express");
const router = express.Router({ mergeParams: true });
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");

const { userLoginSchema } = require("../validation/users");
router.post("/login", userLogin);

async function userLogin(req, res) {
  try {
    const { value, error } = userLoginSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }
    const isValid = await comparePassword(value.password, user.password);
    if (!isValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      accessToken: accessToken,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}
module.exports = router;
