import { Router } from "express";

import ControllerAdmins from "../controllers/admins.controller";
import Auth from "../middlewares/Auth";

class ApiAdmins {
  private router: Router;
  constructor() {
    this.router = Router();
  };

  routes() {
    this.router.get("/", Auth.AuthSuperAdmin, ControllerAdmins.getAdmins);
    this.router.get("/:id", Auth.AuthSuperAdmin, ControllerAdmins.getAdmin);
    this.router.post("/", Auth.AuthSuperAdmin,ControllerAdmins.createAdmin);
    this.router.put("/:id", Auth.AuthSuperAdmin, ControllerAdmins.updateAdmin);
    this.router.delete("/:id", Auth.AuthSuperAdmin, ControllerAdmins.deleteAdmin);

    return this.router;
  };
};

export default new ApiAdmins();
