import adminKnex from "../models/admins.knex";

import { IAdmin } from "../interfaces/interface";

class ServiceAdmins {
  constructor() { }

  async getAdmins(params?: any) {
    try {
      const data = await adminKnex.getAdmins(params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAdmin(id: string) {
    try {
      const data = await adminKnex.getAdmin(id); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async createAdmin(params: IAdmin) {
    try {
      const data = await adminKnex.createAdmin(params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateAdmin(id: string, params: IAdmin) {
    try {
      const data = await adminKnex.updateAdmin(id, params); // Knex
      return data;
    } catch (error) {
      return error;
    }
  }

  async deleteAdmin(id: string) {
    try {
      const data = await adminKnex.deleteAdmin(id); // Knex
      console.log(id);
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceAdmins();
