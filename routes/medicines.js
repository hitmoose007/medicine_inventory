const express = require("express");
const router = express.Router({mergeParams: true});
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isLoggedIn } = require("../middleware/auth");
const { medicineSchema, medicineUpdateSchema } = require("../validation/medicines");

module.exports = router;

router.post("/create", isLoggedIn, createMed); //function to create a medicine
// router.put("/:id", isLoggedIn, updateMed); //function to update a medicine
// router.delete("/:id", isLoggedIn, deleteMed); //function to delete a medicine

async function createMed(req,res){
    const{value, error}=medicineSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.message,
        });
    }
    try{
        const medicine=await prisma.medicine.create({
            data:{
                name:value.name,
                description:value.description,
                quantity:value.quantity,
                price:value.price,
                author: {
                    connect: {
                      id: req.user.id,
                    },
                },
          },
        });
        res.json(medicine);
    }
    catch(error){
        res.json({
            error:error.message,
        });
    }
}