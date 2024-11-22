import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      no_ktp: "1671070707070707",
      nama: "BMW",
      no_telp: "08123456789",
      provinsi: "DKI Jakarta",
      kabupaten: "Jakarta Utara",
      kecamatan: "tes",
      kelurahan: "tes",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
