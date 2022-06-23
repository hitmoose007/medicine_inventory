const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { userRegisterationSchema } = require("../validation/users");

router.post("/users", (req, res) => {
  //create user|
  try {
  const { email, password } = userRegisterationSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }

  const hashedPassword = await hashPassword(value.password);
  //make sure user doesn't already exist
  const user = await prisma.user.findFirst({
    where: {
      email: value.email,
    },
  });
  if (user) {
    return res.status(400).json({
      error: "User already exists",
    });
  }


  const Newuser = await prisma.user.create({
    data: {
      email: value.email,
      password: hashedPassword,
    },
  });
  res.json({
    Newuser,
  });

  }
catch (error) {
    res.json({
      error: error.message,
    });
  }}
);

module.exports = router;