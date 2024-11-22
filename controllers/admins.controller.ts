import { Request, Response } from "express";
import bcrypt from "bcrypt";

import ServiceAdmins from "../services/admins.service";
import ServiceAuth from "../services/auth.service";
import { IAdmin, AdminController } from "../interfaces/interface";

class ControllerAdmins implements AdminController {
  constructor() { }

  async getAdmins(req: Request, res: Response) {
    try {
      const query = req.query as any;
      const Admins = (await ServiceAdmins.getAdmins(query)) as any;
      const totalPages = Math.floor(Admins.total / Number(query?.size ?? 10)) + 1;

      if (Admins.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: Admins,
          meta: {
            page: query?.page ? Number(query?.page) : 1,
            size: query?.size ? Number(query?.size) : 10,
            totalData: Admins.total,
            totalPages,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getAdmin(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const Admin = (await ServiceAdmins.getAdmin(id)) as IAdmin[];

      if (Admin.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: Admin,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getCurrentAdmin(req: Request, res: Response) {
    try {
      const headers = req.headers;
      const token = headers.authorization as string;
      const decoded = (await ServiceAuth.verifyToken(token)) as IAdmin;

      res.status(200).json({
        data: decoded,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createAdmin(req: Request, res: Response) {
    try {
      const password: string = await bcrypt.hash(req.body.password, 10);
      const params: IAdmin = {
        username: req.body.Adminname,
        password: password,
        level: req.body.level,
        region: req.body.region,
      };
      const Admin = (await ServiceAdmins.createAdmin(params)) as IAdmin;
      res.status(200).json({
        message: "Success Create Data!",
        data: Admin,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateAdmin(req: Request, res: Response) {
    const id = req.params.id;
    const params: IAdmin = {
      username: req.body.Adminname,
      password: req.body.password,
      level: req.body.level,
      region: req.body.region,
      updated_at: new Date().toISOString(),
    };
    try {
      const Admin = (await ServiceAdmins.updateAdmin(id, params)) as IAdmin;
      res.status(200).json({
        message: "Success Update Data!",
        data: Admin,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteAdmin(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const admin = (await ServiceAdmins.deleteAdmin(id).then((data) => {
        if (data === 1) {
          res.status(200).json({
            message: "Success Delete Data!",
          });
        } else {
          res.status(404).json({
            message: "Data Not Found!",
          });
        }
      })) as IAdmin;
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ControllerAdmins();
