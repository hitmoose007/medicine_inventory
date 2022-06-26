const joi = require("joi");

const medicineSchema = joi.object({

    name: joi.string().required(),
    description: joi.string().required().max(500),
    price:joi.number().required(),
    quantity:joi.number().required(),


}); 

const medicineUpdateSchema = joi.object({
  
    name: joi.string().required(),
    description: joi.string().required().max(500),
    price:joi.number().required(),
    quantity:joi.number().required(),
    
});


module.exports = { medicineSchema, medicineUpdateSchema };