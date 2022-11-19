require("dotenv").config();
const express = require("express");
const deployRoute = express.Router();
const shell = require("shelljs");
const { updateProduct } = require("../controller/contractDeploy");
const { contractDeploy } = require("../controller/contractInit");
const { deployQr, getLoc } = require("../controller/deployController");
const { productList } = require("../controller/productList");
const { producer } = require("../services/middleware");

deployRoute.get("/product-list/:id", producer, productList);
deployRoute.get("/location/:id", producer, getLoc);
deployRoute.post("/deploy-product", producer, contractDeploy);
deployRoute.post("/update-product", producer, updateProduct);

deployRoute.post("/getqr", producer, deployQr);
module.exports = deployRoute;
