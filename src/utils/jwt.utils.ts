import jwt from "jsonwebtoken";
import { IJwtPayload, IJwtOptions } from "../interfaces/jwt.interface";

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
}
export default JwtService;
