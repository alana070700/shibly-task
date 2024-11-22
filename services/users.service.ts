import usersKnex from "../models/users.knex";
// import usersSequelize from "../models/users.sequelize";

import { IUser } from "../interfaces/interface";

class ServiceUsers {
  constructor() { }

  async getUsers(params?: any) {
    try {
      const data = await usersKnex.getUsers(params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const data = await usersKnex.getUser(id); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async createUser(params: IUser) {
    try {
      const data = await usersKnex.createUser(params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, params: IUser) {
    try {
      const data = await usersKnex.updateUser(id, params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const data = await usersKnex.deleteUser(id); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceUsers();
