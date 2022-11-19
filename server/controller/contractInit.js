const db = require("../services/db");
const { deployProduct } = require("../../scripts/deploy");

exports.contractDeploy = async function (req, res, next) {
  const { id, product_name, producer_loc, carbon, material, date } = req.body;

  if (id && product_name && producer_loc && carbon && material && date) {
    try {
      const data = {
        id,
        product_name,
        producer_loc,
        carbon,
        material,
        date,
      };
      const address = await deployProduct(
        JSON.stringify({ producer_loc, carbon, date })
      );
      const query = db.query(
        `INSERT INTO products(product_id,product_name,material,chain,product_status,company_code,shipping_status,to_address) VALUE('${id}','${product_name}','${material}','${address}','good','${res.data.company_code}','packed','${address}')`
      );
      if (query) {
        return res.status(200).json({ address: address, data });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  } else {
    return res.status(403).json({
      error: "Please fill the required fields",
    });
  }
};
