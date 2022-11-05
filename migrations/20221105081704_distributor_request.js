/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("distributor_request", (table) => {
    table.increments("id").primary();
    table.integer("uid").references("id").inTable("users");
    table.string("company_code", 20);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("distributor_request");
};
