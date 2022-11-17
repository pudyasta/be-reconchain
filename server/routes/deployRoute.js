require("dotenv").config();
const express = require("express");
const deployRoute = express.Router();
const shell = require("shelljs");
const { updateProduct } = require("../controller/contractDeploy");
const { contractDeploy } = require("../controller/contractInit");
const { deployQr } = require("../controller/deployController");
const { producer } = require("../services/middleware");

deployRoute.post("/deploy-product", producer, contractDeploy);
deployRoute.put("/update-product", updateProduct);

deployRoute.post("/getqr", producer, deployQr);
module.exports = deployRoute;
