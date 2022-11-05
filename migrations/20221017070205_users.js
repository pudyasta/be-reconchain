/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 20).notNullable();
    table.string("username", 20).notNullable();
    table.string("email").notNullable();
    table.enum("role", ["producer", "distributor"]).notNullable();
    table.string("company", 100).notNullable();
    table.string("company_code", 20).notNullable();
    table.string("location").notNullable();
    table.string("password", 60).notNullable();
    table.string("longitude", 60).notNullable();
    table.string("latitude", 60).notNullable();
    table.string("profile_pict").notNullable();
    table.boolean("is_active").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
