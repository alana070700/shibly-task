import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("admins", function (table) {
    table.increments("id").primary().notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("level").notNullable();
    table.string("region").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("admins");
}
