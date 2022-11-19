const { deployProduct } = require("../../scripts/deploy");
const { main } = require("../../scripts/interact");
const db = require("../services/db");

exports.updateProduct = async function (req, res, next) {
  const {
    id,
    destination,
    carbon,
    date,
    shipping_status,
    product_status,
    note,
  } = req.body;

  if (
    id &&
    carbon &&
    destination &&
    date &&
    shipping_status &&
    product_status
  ) {
    try {
      const row = await db.query(
        `SELECT * FROM products WHERE product_id='${id}'`
      );
      if (row.length > 0) {
        const data = row[0];
        const address = await deployProduct(
          JSON.stringify({ destination, carbon, date, note })
        );

        const query = db.query(
          `INSERT INTO products(product_id,product_name,material,chain,product_status,company_code,shipping_status,to_address,longitude,latitude) VALUE('${data.product_id}','${data.product_name}','${data.material}','${address}','${product_status}','${res.data.company_code}','${shipping_status}','${data.chain}','${res.data.longitude}','${res.data.latitude}')`
        );
        if (query) {
          return res.status(200).json({
            address: address,
            data: {
              id,
              destination,
              carbon,
              date,
              shipping_status,
              product_status,
              to_address: data.chain,
            },
          });
        }
      } else {
        return res.status(404).json({ data: "Not found" });
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
