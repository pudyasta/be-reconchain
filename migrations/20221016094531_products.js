/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.string("product_id").notNullable();
    table.string("product_name").notNullable();
    table.string("material").notNullable();
    table.string("chain").notNullable();
    table.string("product_status").notNullable();
    table.string("company_code").notNullable();
    table.string("shipping_status").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
