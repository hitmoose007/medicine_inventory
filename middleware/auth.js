const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const { extractToken, decodeToken } = require("../utils/jwt");

//not work
async function isLoggedIn(req, res, next) {
    
  try {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Unauthorized" });

    const token = header.split(" ")[1];
    
    console.log(token);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id, //idk if works lol,
      },
    });
   
    
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("ok");
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
module.exports = { isLoggedIn };
