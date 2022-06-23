const joi = require('joi');

const userRegisterationSchema = joi.object({
  
    email: joi.string().email().required(),
    password: joi.string().required(),
});

module.exports = userRegisterationSchema;
