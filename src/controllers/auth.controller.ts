import { Request, Response } from "express";
import authService from "../services/auth.service";
import { Role } from "../constant/enum";
import JwtService from "../utils/jwt.utils";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";

class AuthController {
  async adminLogin(req: Request, res: Response) {
    const data = req.body;
    const admin = await authService.adminLogin(data);
    let token;
    if (admin.role) {
      token = JwtService.generateAccessToken(admin, Role.ADMIN);
    } else {
      throw HttpException.internalServerError(messages["invalidCredentials"]);
    }
  }
}

export default new AuthController();
