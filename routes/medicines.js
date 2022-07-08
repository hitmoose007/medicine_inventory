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

router.get("/",isLoggedIn,   getMedicines); //get all meds
router.get("/:id", isLoggedIn, getOneMed); //get a single medicine details
router.post("/", isLoggedIn, CreateMed);
router.post("/:categoryId/", isLoggedIn, createMedWithCategory); //function to create a medicine basically we have to pick category and uskai ander jaa kar we create the medicine
router.put("/:id/", isLoggedIn, updateMed); //function to update a medicine
router.delete("/:id", isLoggedIn, deleteMed); //function to delete a medicine
router.put("/decrement/:id", isLoggedIn, decrementMed); //function to decrement medicine
router.put("/increment/:id", isLoggedIn, incrementMed); //function to decrement medicine

async function decrementMed(req, res) {
  try {
    const medicine = await prisma.medicine.update({
      where: {
        id: req.params.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    res.json(medicine.name + "Decremented");
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}
async function incrementMed(req, res) {
  try {
    const medicine = await prisma.medicine.update({
      where: {
        id: req.params.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
    res.json(medicine.name + "Incremented");
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function getMedicines(req, res) {
  try {
    
    const token = await extractToken(req);

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("hello");
    const meds = await prisma.medicine.findMany({
      where: {
        authorId: decoded.id,
      },
    });

    res.json(meds);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function getOneMed(req, res) {
  try {
    const token = await extractToken(req);

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

    const meds = await prisma.medicine.findMany({
      where: {
        authorId: decoded.id,
        id: req.params.id,
      },
    });

    res.json(meds);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function CreateMed(req, res) {
  try {
    const { value, error } = medicineSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }
    const token = await extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    const med = await prisma.medicine.create({
      data: {
        name: value.name,
        description: value.description,
        quantity: value.quantity,
        author: {
          connect: {
            id: decoded.id,
          },
        },
      },
    });
    res.json(med);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

async function createMedWithCategory(req, res) {
  console.log("creating");
  try {
    const { value, error } = medicineSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const token = await extractToken(req);

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

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
        category: {
          connect: {
            id: req.params.categoryId,
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
  console.log(req.params.id);
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
    console.log("successfully updated");
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
