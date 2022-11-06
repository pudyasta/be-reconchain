const express = require("express");
const userRoute = express.Router();
const shell = require("shelljs");
const {
  login,
  register,
  updateUser,
  confirmAccount,
  getDistributorRequest,
} = require("../controller/user");
const { trusted, producer } = require("../services/middleware");

// userRoute.get("/interact", () => {
//   shell.exec("npx hardhat run scripts/interact.js");
//   console.log("oke");
// });

userRoute.get("/distributor-request", producer, getDistributorRequest);

userRoute.post("/login", login);

userRoute.post("/reg", register);

userRoute.put("/update", trusted, updateUser);

userRoute.put("/confirm/:id", producer, confirmAccount);

module.exports = userRoute;
