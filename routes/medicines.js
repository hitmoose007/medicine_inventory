const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isLoggedIn } = require("../middleware/auth");
const {
  medicineSchema,
  medicineUpdateSchema,
} = require("../validation/medicines");
const jwt = require("jsonwebtoken");
const { extractToken, decodeToken } = require("../utils/jwt");
require("dotenv").config();

module.exports = router;

router.post("/", isLoggedIn, createMed); //function to create a medicine
router.put("/:id", isLoggedIn, updateMed); //function to update a medicine
router.delete("/:id", isLoggedIn, deleteMed); //function to delete a medicine
//all tested they work

async function createMed(req, res) {
  console.log("creating");
  try {
    const { value, error } = medicineSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Unauthorized" });
    const token = header;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const medicine = await prisma.medicine.create({
      data: {
        name: value.name,
        description: value.description,
        quantity: value.quantity,
        price: value.price,
        author: {
          connect: {
            id: decoded.id,
          },
        },
      },
    });
    res.json(medicine);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function updateMed(req, res) {
    console.log("Updating")
  const { value, error } = medicineUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  try {
    const medicine = await prisma.medicine.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: value.name,
        description: value.description,
        quantity: value.quantity,
        price: value.price,
      },
    });
    res.json(medicine);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function deleteMed(req, res) {
    try {
      const medicine = await prisma.medicine.delete({
        where: {
          id: req.params.id,
        },
      });
      res.json(medicine);
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  }