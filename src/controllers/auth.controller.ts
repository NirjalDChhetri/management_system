import { Request, Response } from "express";
import authService from "../services/auth.service";
import { Role } from "../constant/enum";
import JwtService from "../utils/jwt.utils";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import tokenService from "../services/token.service";
import { StatusCodes } from "../constant/statusCodes";
import {
  ChangePasswordDTO,
  ForgotPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
} from "../dtos/login.dto";

class AuthController {
  async adminLogin(req: Request, res: Response) {
    const data = req.body;
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const admin = await authService.adminLogin(data);
    let token: any;
    if (admin.role) {
      token = JwtService.generateAccessToken(admin, Role.ADMIN);
    } else {
      throw HttpException.internalServerError(messages["invalidCredentials"]);
    }
    await tokenService.create(token, ONE_DAY_AFTER, admin);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      token: token,
      message: messages["validLogin"],
    });
  }

  async userLogin(req: Request, res: Response) {
    const data = req.body as LoginDTO;
    const ONE_DAY_AFTER = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const user = await authService.userLogin(data);
    const token = JwtService.generateAccessToken(user, Role.USER);
    await tokenService.create(token, ONE_DAY_AFTER, user);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      accessToken: token,
      message: messages["validLogin"],
    });
  }

  async changePassword(req: Request, res: Response) {
    const data = req.body as ChangePasswordDTO;
    const user = req.user;
    await authService.changePassword(data, user);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      data: user,
      message: messages["updatePassword"],
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const data = req.body as ForgotPasswordDTO;
    await authService.forgotPassword(data);
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: "Check your mail",
    });
  }

  async resetPassword(req: Request, res: Response) {
    const data = req.body as ResetPasswordDTO
    const setPassword = await authService.setNewPassword(data)
  }
}

export default new AuthController();
