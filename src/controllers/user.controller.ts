import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";
import { StatusCodes } from "../constant/statusCodes";
import messages from "../constant/messages";

class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const data = req.body as UserDTO;
    const newUser = await userService.signup(data);
    res.status(StatusCodes.SUCCESS).json({
      status: "success",
      data: newUser,
      message: messages["userCreated"],
    });
  }
}

export default new UserController();
