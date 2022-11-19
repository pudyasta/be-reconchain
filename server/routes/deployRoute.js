require("dotenv").config();
const express = require("express");
const deployRoute = express.Router();
const shell = require("shelljs");
const { updateProduct } = require("../controller/contractDeploy");
const { contractDeploy } = require("../controller/contractInit");
const { deployQr } = require("../controller/deployController");
const { productList } = require("../controller/productList");
const { producer } = require("../services/middleware");

deployRoute.get("/product-list", producer, productList);
deployRoute.post("/deploy-product", producer, contractDeploy);
deployRoute.post("/deploy-product", producer, contractDeploy);

deployRoute.post("/getqr", producer, deployQr);
module.exports = deployRoute;
