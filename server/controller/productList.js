// const { getContract } = require("../../scripts/getContract");
// const axios = require("axios");
require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const db = require("../services/db");

const { getContract } = require("../../scripts/getContract");

exports.productList = async (req, res, next) => {
  const params = req.params.id;
  try {
    const chains = await db.query(
      `SELECT * FROM products WHERE product_id='${params}'`
    );
    if (chains.length > 0) {
      const company = await db.query(
        `SELECT company from users WHERE company_code='${chains[0].company_code}'`
      );
      let data = [];
      let total = 0;
      for (let i = 0; i < chains.length; i++) {
        const a = await getContract(chains[i].chain);
        x = JSON.parse(a);
        total += Number(x.carbon);
        data.push(JSON.parse(a));
      }

      return res.status(200).json({
        product_name: chains[0].product_name,
        shipping_status: chains[chains.length - 1].shipping_status,
        company: company[0].company,
        material: chains[0].material,
        manufacture: data[0].date,
        data,
      });
    } else {
      return res.status(404).json({ data: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
