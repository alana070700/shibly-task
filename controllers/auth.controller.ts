import { Request, Response } from "express";

import ServiceAuth from "../services/auth.service";
import { Login, IAdmin } from "../interfaces/interface";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your decoded user type
}

class ControllerAuth {
  constructor() {}

  async getLogin(req: Request, res: Response) {
    const params: Login = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const response = (await ServiceAuth.getLogin(params)) as any;

      if (!response.success) {
        return res.status(400).json({
          success: response.success,
        });
      }

      const user: IAdmin = {
        id: response.data.id,
        username: response.data.username,
        level: response.data.role,
        region: response.data.region,
      };

      const token = ServiceAuth.generateToken(user);

      (req as AuthenticatedRequest).user = user;

      res.status(200).json({
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ControllerAuth();
