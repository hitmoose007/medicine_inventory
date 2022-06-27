require("dotenv").config();
const jwt = require("jsonwebtoken");

async function extractToken(req) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Unauthorized" });
  return header; // Bearer <token>
}

async function decodeToken(token, secret) {
    
  return jwt.verify(token, secret);
}

//user directly from the request
async function getLoggedInUser(req) {
  try {
    
    const token = extractToken(req);
    const decoded = await decodeToken(token);
    
    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });
    return user;
  } catch (error) {
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
}
module.exports = { extractToken, getLoggedInUser, decodeToken };
