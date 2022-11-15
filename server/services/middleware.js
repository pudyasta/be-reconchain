const jwt = require("jsonwebtoken");
const db = require("./db");

exports.trusted = async (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
  if (authToken !== undefined) {
    const authData = jwt.verify(authToken, "ppp");
    if (authData) {
      req.token = authToken;
      res.data = authData;
      next();
    } else {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
  } else {
    return res.status(403).json({
      error: "Forbidden",
    });
  }
};

exports.producer = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    if (authToken !== undefined) {
      const authData = jwt.verify(authToken, "ppp");
      if (authData.role == "producer") {
        res.data = authData;
        next();
      } else {
        return res.status(403).json({
          error: "Forbidden",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Invalid" });
  }
};
