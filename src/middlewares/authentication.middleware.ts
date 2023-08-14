import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import messages from "../constant/messages";
import JwtService from "../utils/jwt.utils";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/database.config";

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
  let payload = JwtService.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  );
  if (!payload) {
    throw HttpException.unauthorized(messages["unAuthorized"]);
  }
  let userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({
      where: {
        id: payload?.id,
      },
    });
    if (!user) {
      throw HttpException.badRequest(messages["unAuthorized"]);
    }
    req.user = user;
    next();
    
  } catch (error) {
    next(error);
  }
};

export default authentication;
