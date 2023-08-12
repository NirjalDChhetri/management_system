import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import JwtService from "../utils/jwt.utils";
import DotenvConfig from "../config/env.config";
import { User } from "../entities/user.entity";
import { Admin } from "../entities/admin.entity";
import { Mode, Role } from "../constant/enum";
import { StatusCodes } from "../constant/statusCodes";

const authentication = (_userRole?: Role) => async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req?.headers;

    if (!authorization) {
      return next(HttpException.badRequest(messages.unAuthorized));
    }

    const data = authorization.trim().split(" ");

    if (data.length !== 2 || data[0] !== "BEARER") {
      return next(HttpException.badRequest(messages.unAuthorized));
    }

    const mode = data[0];
    const token = data[1];
    try {
      let data: any;
      if (mode === Mode.BEARER)
        data = JwtService.verify(token, DotenvConfig.ACCESS_TOKEN_SECRET);
      else throw HttpException.badRequest(messages.unAuthorized);
      const { id, role } = data;
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
          const { password, createdAt, deletedAt, updatedAt, ...rest } = user;
          req.user = rest;
          return next();
      }
    } catch (err: any) {
      return next(
        new HttpException(messages["unAuthorized"], StatusCodes.BAD_REQUEST)
      );
    }
  };
export default authentication;
