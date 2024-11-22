import { Request, Response } from "express";

import ServiceUsers from "../services/users.service";
import { IUsers, UserController } from "../interfaces/interface";

class ControllerUsers implements UserController {
  constructor() { }

  async getUsers(req: Request, res: Response) {
    try {
      const Users = (await ServiceUsers.getUsers()) as IUsers[];

      if (Users.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: Users,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const User = (await ServiceUsers.getUser(id)) as IUsers[];

      if (User.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: User,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const params: IUsers = {
        no_ktp: req.body.no_ktp,
        nama: req.body.nama,
        no_telp: req.body.no_telp,
        provinsi: req.body.provinsi,
        kabupaten: req.body.kabupaten,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
      };

      const User = (await ServiceUsers.createUser(params)) as IUsers;

      res.status(200).json({
        message: "Success Create Data!",
        data: User,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const params: IUsers = {
        no_ktp: req.body.no_ktp,
        nama: req.body.nama,
        no_telp: req.body.no_telp,
        provinsi: req.body.provinsi,
        kabupaten: req.body.kabupaten,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        updated_at: new Date().toISOString(),
      };

      const User = (await ServiceUsers.updateUser(id, params)) as IUsers;

      res.status(200).json({
        message: "Success Update Data!",
        data: User,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const User = (await ServiceUsers.deleteUser(id).then((data) => {
        if (data) {
          res.status(200).json({
            message: "Success Delete Data!",
            data: data,
          });
        } else {
          res.status(404).json({
            message: "Data Not Found!",
          });
        }
      })) as IUsers;
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ControllerUsers();
