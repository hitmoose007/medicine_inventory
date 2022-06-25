var nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "moosabutt715@gmail.com",
    pass: "gmwpmvvcmpovpqno",
  },
});

module.exports = { transporter };
