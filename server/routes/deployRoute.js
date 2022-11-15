require("dotenv").config();
const express = require("express");
const deployRoute = express.Router();
const shell = require("shelljs");
const { deployQr } = require("../controller/deployController");
const { producer } = require("../services/middleware");

deployRoute.get("/interact", async (req, res, next) => {
  console.log("first");
});

deployRoute.post("/getqr", producer, deployQr);
module.exports = deployRoute;
