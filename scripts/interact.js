// interact.js
require("dotenv").config();
const { ethers } = require("hardhat");

const { PRIVATE_KEY } = process.env;
const API_KEY = "sin8g3FjPk-9re6lqMN_t5ftHcc_LVo9";
const CONTRACT_ADDRESS = "0x52E38eEA58FbD494F684857CF243017daCa9c987";

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "matic"),
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);
alchemyProvider.getGasPrice().then(console.log);

const main = async function (msg) {
  // const add = await alchemyProvider.getCode("latest");
  // console.log(add);
  const message = await helloWorldContract.messagex();
  console.log("The message is: " + message);

  const tx = await helloWorldContract.update(
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  );
  await tx.wait();

  const newMessage = await helloWorldContract.messagex();
  // const newAddress = await alchemyProvider.getBlock("latest");
  console.log(newMessage);
  // return {
  //   new: newMessage,
  //   // block: newAddress.transactions[newAddress.transactions.length - 1],
  // };
};
main();
// module.exports = main;
