import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.increments("id").primary().notNullable();
    table.string("no_ktp").unique().notNullable();
    table.string("nama").unique().notNullable();
    table.string("no_telp").unique().notNullable();
    table.string("provinsi").unique().notNullable();
    table.string("kabupaten").unique().notNullable();
    table.string("kecamatan").unique().notNullable();
    table.string("kelurahan").unique().notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
