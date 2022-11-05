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
      if (authData) {
        const acc = await db.query(
          `SELECT company_code, is_active FROM users WHERE id="${req.params.id}"`
        );
        if (acc.length > 0) {
          if (authData.company_code == acc[0]?.company_code) {
            next();
          } else {
            return res.status(403).json({
              error: "Forbidden",
            });
          }
        } else {
          return res.status(801).json({
            error: "User not found ",
          });
        }
      } else {
        return res.status(403).json({
          error: "Forbidden",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};
