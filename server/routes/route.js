const express = require("express");
const userRoute = express.Router();
const shell = require("shelljs");
const { login, register, updateUser } = require("../controller/user");
const { trusted } = require("../services/middleware");

// userRoute.get("/interact", () => {
//   shell.exec("npx hardhat run scripts/interact.js");
//   console.log("oke");
// });

userRoute.post("/login", login);

userRoute.post("/reg", async (req, res, next) => {
  try {
    res.json(await register(req.body));
  } catch (err) {
    res.status(400).json({ data: err.message });
    next(err);
  }
});

userRoute.put("/update", trusted, updateUser);

module.exports = userRoute;
