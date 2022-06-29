const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { userRegisterationSchema } = require("../validation/users");

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");
const { transporter } = require("../utils/mail");
require("dotenv").config();

router.post("/", userCreation);
router.post("/forgotpassword",forgotPassword);

async function userCreation(req, res) {
  //create user|
  console.log(req.body)
  try {
    const { value, error } = userRegisterationSchema.validate(req.body);

    if (error) {
      console.log(req)
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
        name: value.name,
        email: value.email,
        password: hashedPassword,
      },
    });

    // async email
    jwt.sign(
      {
        user: Newuser.id,
      },
      process.env.VERIFICATION_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        console.log("hello");
        const url = `http://localhost:5000/api/verification/${emailToken}`;

        transporter.sendMail(
          {
            to: Newuser.email,
            subject: "Confirm Email",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          },
          (err, info) => {
            console.log("here");
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          }
        );
      }
    );

    //end async email

    res.json({
      Newuser,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function forgotPassword(req,res){
  console.log(req.body)
  try{
        //make sure user already exist
        const user = await prisma.user.findFirst({
          where: {
            email: req.body.email,
          },
        });
        const message =
        'You will receive a reset email if user with that email exist';
        if (!user) {
          return res.status(400).json({
            error: "User doesn't exist",
          });
        }
        if (!user.isVerified){
          return res.status(400).json({
            error:"User not verified",
          });
        }
            // async email
    jwt.sign(
      {
        user: user.id,
      },
      process.env.VERIFICATION_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        console.log("hello");
        const url = `http://localhost:5000/api/verification/forgotpassword/${emailToken}`;

        transporter.sendMail(
          {
            to: user.email,
            subject: "Forgot Password",
            html: `Please click this url to reset your password: <a href="${url}">${url}</a>`,
          },
          (err, info) => {
            console.log("here");
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          }
        );
      }
    );

    //end async email
  }
  catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports = router;
