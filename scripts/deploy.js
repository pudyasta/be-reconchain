const { ethers } = require("hardhat");
exports.deployProduct = async function (data) {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy(data);
  return hello_world.address;
};
