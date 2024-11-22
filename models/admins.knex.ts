import knex from "../database/knex/knex";

import { IAdmin, AdminModel } from "../interfaces/interface";

class Admins implements AdminModel<IAdmin> {
  private Admins;
  constructor() {
    this.Admins = knex;
  }

  async getAdmins() {
    try {
      const result = await this.users
        .select("*")
        .from("users")
        .orderBy("id", "asc");
      return result;
    } catch (error) {
      return error;
    }
  }

  async getAdmin(id: string) {
    try {
      const data = await this.Admins
        .select("*")
        .from("Admins")
        .where("id", "=", id);
      return data[0];
    } catch (error) {
      return error;
    }
  }

  async createAdmin(params: IAdmin) {
    try {
      const result = await this.Admins("Admins").insert(params).returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateAdmin(id: string, params: IAdmin) {
    try {
      const result = await this.Admins("Admins")
        .where("id", "=", id)
        .update(params)
        .returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteAdmin(id: string) {
    try {
      const result = await this.Admins("Admins").where("id", "=", id).del();
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new Admins();
