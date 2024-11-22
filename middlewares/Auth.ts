import { Response, Request, NextFunction } from "express";
import ServiceAuth from "../services/auth.service";

class Authorization {
  constructor() {}

  async Auth(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  }

  async AuthSuperAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (decoded.role !== "pusat") {
      return res.status(403).json({
        message: "Not Super Admin",
      });
    }

    next();
  }
}

export default new Authorization();
