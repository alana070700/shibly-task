import { Request, Response } from "express";

export type Login = {
  username: string;
  password: string;
};

export interface IAdmin {
  id?: string;
  username?: string;
  password?: string;
  level?: string;
  region?: string;
  created_at?: string;
  updated_at?: string;
};

export interface AdminModel<IAdmin> {
  getAdmins: () => void;
  getAdmin: (id: string) => void;
  createAdmin: (params: IAdmin) => void;
  updateAdmin: (id: string, params: IAdmin) => void;
  deleteAdmin: (id: string) => void;
};

export interface AdminController {
  getAdmins: (req: Request, res: Response) => void;
  getAdmin: (req: Request, res: Response) => void;
  getCurrentAdmin: (req: Request, res: Response) => void;
  createAdmin: (req: Request, res: Response) => void;
  updateAdmin: (req: Request, res: Response) => void;
  deleteAdmin: (req: Request, res: Response) => void;
};

export interface IUsers {
  id?: string;
  no_ktp?: string;
  nama?: string;
  no_telp?: string;
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  kelurahan?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserModel<T> {
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (params: IUsers) => void;
  updateUser: (id: string, params: IUsers) => void;
  deleteUser: (id: string) => void;
}

export interface UserController {
  getUsers: (req: Request, res: Response) => void;
  getUser: (req: Request, res: Response) => void;
  createUser: (req: Request, res: Response) => void;
  updateUser: (req: Request, res: Response) => void;
  deleteUser: (req: Request, res: Response) => void;
}
