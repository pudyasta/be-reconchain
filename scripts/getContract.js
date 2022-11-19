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
  const newAddress = await alchemyProvider.getTransactionReceipt(
    "0x9c97B0b5d55a34a969b7Ff7251aC1fD103D7A3c6"
  );

  return newAddress;
  //   console.log(message);
  //   const tx = await helloWorldContract.update(data);
  //   await tx.wait();

  //   const newAddress = await alchemyProvider.getBlock("latest");
  //   return {
  //     block: newAddress.transactions[newAddress.transactions.length - 1],
  //   };
};
