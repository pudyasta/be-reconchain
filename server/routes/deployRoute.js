require("dotenv").config();
const express = require("express");
const deployRoute = express.Router();
const shell = require("shelljs");
const main = require("../../scripts/interact");

deployRoute.get("/interact", async (req, res, next) => {
  //   const oldAddress = process.env.CONTRACT_ADDRESS;
  //   console.log(oldAddress);
  //   process.env.CONTRACT_ADDRESS = req.body.address;
  //   main("Halo baru coba");
  shell.exec("npx hardhat run scripts/interact.js");
  //   console.log(success);
});

module.exports = deployRoute;
