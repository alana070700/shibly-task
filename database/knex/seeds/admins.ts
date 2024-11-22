import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const SALT = bcrypt.genSaltSync(5);
  const password = bcrypt.hashSync("pakjo123", SALT);
  // Deletes ALL existing entries
  await knex("admins").del();

  // Inserts seed entries
  await knex("admins").insert([
    {
      username: "alana",
      password: password,
      level: "pusat",
      region: "DKI Jakarta",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
