const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const { extractToken, decodeToken } = require("../utils/jwt");

//idk if works lol
async function isLoggedIn(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Unauthorized" });

    const token = header.split(" ")[1];

    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id, //idk if works lol,
      },
    });
    console.log("ali tatta hay");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
module.exports = { isLoggedIn };
