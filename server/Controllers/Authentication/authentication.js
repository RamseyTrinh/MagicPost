const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.SECRET_STR;

function createAccessToken(userId) {
  const accessToken = jwt.sign(
    {
      iss: "Access",
      sub: userId,
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );
  return accessToken;
}

function verifyAccessToken(token) {
  try {
    var decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.iss === "Access") {
      return true;
    }
  } catch (err) {}
  return false;
}

function getUserIdFromToken(token) {
  try {
    var decoded = jwt.verify(token, JWT_SECRET);

    return decoded.sub;
  } catch (err) {
    return -1;
  }
}

function validateUser(req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    console.log(accessToken);
    if (verifyAccessToken(accessToken)) {
      next();
    } else {
      return res.status(403).json({
        error: "Vui lòng nhập đúng và đủ thông tin!",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

function extractAuthorization(req, res, next) {
  const accessToken = req.headers.authorization;
  const userId = getUserIdFromToken(accessToken);
  if (userId > 0) {
    req.uid = userId;
    next();
  } else {
    return res.status(400).json({
      error: "Corrupted access token",
    });
  }
}

module.exports = {
  createAccessToken,
  verifyAccessToken,
  getUserIdFromToken,
  validateUser,
  extractAuthorization,
};
