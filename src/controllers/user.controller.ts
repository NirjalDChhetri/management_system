import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";

class UserController {
  signup(req: Request, res: Response) {
    const data = req.body as UserDTO
    const newUser = userService.signup(data);
  }
}

export default new UserController();
