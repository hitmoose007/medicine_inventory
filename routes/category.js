const express = require("express");
const router = express.Router({ mergeParams: true });

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { extractToken, decodeToken } = require("../utils/jwt");
const { categorySchema } = require("../validation/category");

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

async function getCategories(req, res) {
  try {
    const token = extractToken(req);
   
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

    const categories = await prisma.categories.findMany({
      where: {
        authorId: decoded.id,
      },
    });

    res.json(categories);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function createCategory(req, res) {
  try {
    const { value, error } = categorySchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }

    const token = extractToken(req);
    console.log(token);
    
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
 
    const category = await prisma.categories.create({
      data: {
        name: value.name,
        authorId: decoded.id,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const { value, error } = categorySchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }
    const token = extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    const category = await prisma.categories.update({
      where: {
        id: req.params.id,
        authorId: decoded.id,
      },
      data: {
        name: value.name,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const token = extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    const category = await prisma.categories.delete({
      where: {
        id: req.params.id,
        authorId: decoded.id,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
module.exports = router;
