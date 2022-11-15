/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("qrcode", (table) => {
    table.increments("id").primary();
    table.string("qrcode_id").notNullable();
    table.string("image_url").notNullable();
    table.string("status").notNullable();
    table.string("username", 20);
    table.integer("product_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("qrcode");
};
