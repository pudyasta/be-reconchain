const { main } = require("../../scripts/interact");
const db = require("../services/db");

exports.updateProduct = async function (req, res, next) {
  const { id, detination, carbon, date, shipping_status, product_status } =
    req.body;

  if (id && carbon && detination && date && shipping_status && product_status) {
    try {
      const row = await db.query(
        `SELECT chain FROM products WHERE product_id='${id}'`
      );
      const address = await main(
        `${{ detination, carbon, date }}`,
        row[0].chain
      );
      const query = db.query(
        `UPDATE products SET shipping_status='${shipping_status}',product_status='${product_status}' WHERE product_id='${id}'`
      );
      if (query) {
        return res.status(200).json({
          address: address,
          data: {
            id,
            detination,
            carbon,
            date,
            shipping_status,
            product_status,
          },
        });
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
