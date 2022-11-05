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

userRoute.post("/reg", register);

userRoute.put("/update", trusted, updateUser);

module.exports = userRoute;
