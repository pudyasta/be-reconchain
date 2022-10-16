const express = require("express");
const chainRoute = express.Router();
const shell = require("shelljs");
const { getMultiple } = require("../controller/user");

// chainRoute.get("/interact", () => {
//   // shell.exec("npx hardhat run scripts/interact.js");
//   // console.log("oke");
// });

chainRoute.get("/test", async function (req, res, next) {
  try {
    res.json(await getMultiple());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = chainRoute;
