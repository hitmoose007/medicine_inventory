const express = require("express");
const router = express.Router({ mergeParams: true });

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { extractToken, decodeToken } = require("../utils/jwt");
const { categorySchema } = require("../validation/category");
const jwt = require("jsonwebtoken");

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

async function getCategories(req, res) {
  try {
    const token = await extractToken(req);

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

    const categories = await prisma.category.findMany({
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

    const token = await extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);

    const category = await prisma.category.create({
      data: {
        name: value.name,
        author: {
          connect: {
            id: decoded.id,
          },
        },
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
    const token = await extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    const category = await prisma.category.updateMany({
      where: {
        id: req.params.id,
        authorId: decoded.id,
      },
      data: {
        name: value.name,
      },
    });
    if (!category) {
      res.status(404).json({
        error: "Category not found",
      });
    }

    const updatedCategory = await prisma.category.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const token = await extractToken(req);
    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET);
    const category = await prisma.category.deleteMany({
      where: {
        id: req.params.id,
        authorId: decoded.id,
      },
    });
    if (!category) {
      res.status(404).json({
        error: "Category not found",
      });
    }

    //not returning deleted category

    res.json(category);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
module.exports = router;
