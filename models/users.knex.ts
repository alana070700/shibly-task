import knex from "../database/knex/knex";

import { IUser, UserModel } from "../interfaces/interface";

class Users implements UserModel<IUser> {
  private users;
  constructor() {
    this.users = knex;
  }

  async getUsers(params?: any) {
    const size = params?.size ? Number(params?.size) : 10;
    const page = params?.page ? Number(params?.page) - 1 : 0;
    try {
      const data = (await this.users
        .select("*")
        .limit(size)
        .offset(page * size)
        .from("Admins")
        .where("status", "=", "available")
        .where("available", "=", true)
        .orderBy("created_at", "desc")) as any;

      if (params?.search) {
        data
          .whereILike("title", `%${params?.search}%`)
          .orWhereILike("author", `%${params?.search}%`);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const result = await this.users
        .select("*")
        .from("users")
        .where("id", "=", id);
      return result;
    } catch (error) {
      return error;
    }
  }

  async createUser(params: IUser) {
    try {
      const result = await this.users("users").insert(params).returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, params: IUser) {
    try {
      const result = await this.users("users")
        .where("id", "=", id)
        .update(params)
        .returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await this.users("users").where("id", "=", id).del();
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new Users();
