const db = require("../services/db");
const config = require("../../config");

async function getMultiple() {
  const rows = await db.query(`SELECT * FROM products`);
  const data = rows;

  return {
    data,
  };
}

module.exports = {
  getMultiple,
};
