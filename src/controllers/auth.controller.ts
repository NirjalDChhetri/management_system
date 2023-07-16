import { Request, Response } from "express";
import authService from "../services/auth.service";
import { Role } from "../constant/enum";
import JwtService from "../utils/jwt.utils";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import tokenService from "../services/token.service";
import { StatusCodes } from "../constant/statusCodes";

class AuthController {
  async adminLogin(req: Request, res: Response) {
    const data = req.body;
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const admin = await authService.adminLogin(data);
    let token;
    if (admin.role) {
      token = JwtService.generateAccessToken(admin, Role.ADMIN);
    } else {
      throw HttpException.internalServerError(messages["invalidCredentials"]);
    }
    await tokenService.create(token, ONE_DAY_AFTER, admin);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      accessToken: token,
      message: messages["validLogin"],
    });
  }
}

export default new AuthController();
