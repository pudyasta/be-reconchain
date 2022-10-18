const express = require("express");
const userRoute = express.Router();
const shell = require("shelljs");
const { getMultiple, login, register } = require("../controller/user");

// userRoute.get("/interact", () => {
//   // shell.exec("npx hardhat run scripts/interact.js");
//   // console.log("oke");
// });

userRoute.get("/test", async function (req, res, next) {
  try {
    res.json(await getMultiple());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

userRoute.post("/login", async (req, res, next) => {
  try {
    res.json(await login(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
userRoute.post("/reg", async (req, res, next) => {
  try {
    res.json(await register(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = userRoute;
