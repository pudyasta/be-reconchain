// const { getContract } = require("../../scripts/getContract");
// const axios = require("axios");
require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const db = require("../services/db");

const { getContract } = require("../../scripts/getContract");

exports.productList = async (req, res, next) => {
  const params = req.params.id;
  const chains = await db.query(
    `SELECT * FROM products WHERE product_id='${params}'`
  );
  const data = [];

  chains.forEach(async (e) => {
    const contract = await getContract(e.chain);
    const a = JSON.parse(contract);
    data.push(a);
    console.log(data);
  });
  // console.log(data);
  //   //   const ok = await fetch(
  //   //     "https://api.block16.io/v1/address/0x0000000000000000000000000000000000000001/transactions"
  //   //   );
  //   const ok = await getContract("0x9c97B0b5d55a34a969b7Ff7251aC1fD103D7A3c6");
  //   console.log(ok);
  //   //   const ok1 = await ok();

  //   //   fetch(
  //   //     "https://api.block16.io/v1/address/0x0000000000000000000000000000000000000001/transactions"
  //   //   )
  //   //     .then((response) => response.json())
  //   //     .then((data) => console.log(data));
  //   //   //   console.log(ok1);

  // const config = {
  //   apiKey: "DuO3sZEiyNDhkh8-PBeiAcGTmAxNig54",
  //   network: Network.MATIC_MUMBAI,
  // };
  // const alchemy = new Alchemy(config);

  // const data = await alchemy.core.getAssetTransfers({
  //   toAddress: "0x9c97B0b5d55a34a969b7Ff7251aC1fD103D7A3c6",
  //   category: ["external", "erc20", "erc721", "erc1155", "internal"],
  // });

  // console.log(data);
};
