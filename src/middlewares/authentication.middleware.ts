import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import JwtService from "../utils/jwt.utils";
import DotenvConfig from "../config/env.config";
import { User } from "../entities/user.entity";
import { Admin } from "../entities/admin.entity";
import { Mode, Role } from "../constant/enum";
import { StatusCodes } from "../constant/statusCodes";

const authentication =
  (_userRole?: Role) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(HttpException.badRequest(messages["unAuthorized"]));
    }
    try {
      const payload = await JwtService.verify(
        token,
        DotenvConfig.ACCESS_TOKEN_SECRET
      );
      const { id, email, role } = payload;
      let user: any;
      switch (role) {
        case Role.ADMIN:
          user = await Admin.findOne({
            where: {
              id: id,
            },
          });

          break;
        case Role.USER:
          user = await User.findOne({
            where: { id: id },
          });
          if (!user) {
            throw HttpException.badRequest(messages["unAuthorized"]);
          }
          req.user = user;
          return next();
      }
    } catch (err: any) {
      return next(
        new HttpException(messages["unAuthorized"], StatusCodes.BAD_REQUEST)
      );
    }
  };

export default authentication;
