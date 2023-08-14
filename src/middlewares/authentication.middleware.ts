import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import JwtService from "../utils/jwt.utils";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/database.config";
import { Role } from "../constant/enum";
import { Admin } from "../entities/admin.entity";
import { StatusCodes } from "../constant/statusCodes";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(HttpException.badRequest(messages["unAuthorized"]));
  }
  try {
    let payload = JwtService.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (!payload) {
      throw HttpException.unauthorized(messages["unAuthorized"]);
    }
    let user: any;
    const { id, email, role } = payload;
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
          where: {
            id: id,
          },
        });
    }
    if (!user) {
      throw HttpException.badRequest(messages["unAuthorized"]);
    }
    const { password, createdAt, deletedAt, updatedAt, ...rest } = user;
    req.user = rest;
    return next();
  } catch (err: any) {
    return next(
      new HttpException(messages["unAuthorized"], StatusCodes.BAD_REQUEST)
    );
  }
};

export default authentication;
