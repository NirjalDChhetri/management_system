import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";
import { StatusCodes } from "../constant/statusCodes";

class UserController {
  signup(req: Request, res: Response, next: NextFunction) {
    const data = req.body as UserDTO;
    const newUser = userService.signup(data);
    res.status(StatusCodes.SUCCESS).json({
      status: "success",
      data: {
        newUser,
      },
      message: "User Created Successfully",
    });
  }
}

export default new UserController();
