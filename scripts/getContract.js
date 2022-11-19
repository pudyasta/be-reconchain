// interact.js
require("dotenv").config();
const { ethers } = require("hardhat");

const { PRIVATE_KEY } = process.env;
const API_KEY = "DuO3sZEiyNDhkh8-PBeiAcGTmAxNig54";

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "maticmum"),
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance

exports.getContract = async function (block) {
  const CONTRACT_ADDRESS = block;
  const helloWorldContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    signer
  );
  const message = await helloWorldContract.messagex();
  return message;
};
