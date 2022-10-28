const jwt = require("jsonwebtoken");

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
        message: "Forbidden",
      });
    }
  } else {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
};
