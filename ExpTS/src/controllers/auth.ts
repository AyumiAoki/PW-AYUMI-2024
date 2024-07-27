import { Request, Response } from "express";
import { getMajors } from "../service/major";

const signup = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    const majors = await getMajors();
    res.render("auth/signup", {majors})
  }
};

const login = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

export default { signup, login, logout };
