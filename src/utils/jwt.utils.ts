import jwt from "jsonwebtoken";
import { IJwtPayload, IJwtOptions } from "../interfaces/jwt.interface";
import { Role } from "../constant/enum";
import DotenvConfig from "../config/env.config";

class JwtService {
  static sign(user: IJwtPayload, options: IJwtOptions, role?: string) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role,
      },
      options.secret,
      {
        expiresIn: options.expiresIn,
      }
    );
  }
  static verify(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  static generateAccessToken(user: IJwtPayload, role: string) {
    return this.sign(
      user,
      {
        expiresIn: DotenvConfig.ACCESS_TOKEN_EXPIRES_IN,
        secret: DotenvConfig.ACCESS_TOKEN_SECRET,
      },
      role
    );
  }
}
export default JwtService;
