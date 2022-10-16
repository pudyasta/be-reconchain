// interact.js
const { ethers } = require("hardhat");

const API_KEY = "DuO3sZEiyNDhkh8-PBeiAcGTmAxNig54";
const PRIVATE_KEY =
  "901c905d504285e8fa59cd289ba72b0495b92e7dd8f867db29cf136a14ece78e";
const CONTRACT_ADDRESS = "0x8a95Fdb4D427dF6CD610Cbfa921F5A7031dc12fF";

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "maticmum"),
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const message = await helloWorldContract.messagex();
  console.log("The message is: " + message);

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("Testing route one two three");
  await tx.wait();

  const newMessage = await helloWorldContract.messagex();
  console.log("The new message is: " + newMessage);
  return {
    new: newMessage,
  };
}
main();
