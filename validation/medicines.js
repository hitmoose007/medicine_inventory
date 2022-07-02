const joi = require("joi");

const medicineSchema = joi.object({

    name: joi.string().required(),
    description: joi.string().required().max(500),
    price:joi.number().required(),
    quantity:joi.number().required(),
    category:joi.string(),

}); 

const medicineUpdateSchema = joi.object({
  
    name: joi.string().required(),
    description: joi.string().required().max(500),
    price:joi.number().required(),
    quantity:joi.number().required(),
    category:joi.string(),
});


module.exports = { medicineSchema, medicineUpdateSchema };