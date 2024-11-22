import { Router } from "express";

import ControllerUsers from "../controllers/users.controller";
import Auth from "../middlewares/Auth";

class ApiUsers {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.get("/", ControllerUsers.getUsers);
    this.router.get("/:id", ControllerUsers.getUser);
    this.router.post("/", ControllerUsers.createUser);
    this.router.put("/:id", ControllerUsers.updateUser);
    this.router.delete("/:id", ControllerUsers.deleteUser);

    return this.router;
  }
}

export default new ApiUsers();
