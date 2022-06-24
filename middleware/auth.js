const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const { extractToken, decodeToken } = require("../utils/jwt");

//not tested
async function isLoggedIn(req, res, next) {
  try {
    const token = extractToken(req);
    const decoded = await decodeToken(token);
    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
}
