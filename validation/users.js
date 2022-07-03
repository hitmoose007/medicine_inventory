const joi = require("joi");

const userRegisterationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.any()
    .valid(joi.ref("password"))
    .required(),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const forgotPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

module.exports = {
  userRegisterationSchema,
  userLoginSchema,
  forgotPasswordSchema,
};
