import { AppDataSource } from "../config/database.config";
import { TokenStatus } from "../constant/enum";
import { Admin } from "../entities/admin.entity";
import Token from "../entities/token.entity";
import { User } from "../entities/user.entity";

class TokenService {
  constructor(private tokenRepository = AppDataSource.getRepository(Token)) {}

  async create(userToken: string, expiresAt: Date, user: Admin | User) {
    const token = new Token();
    token.token = userToken;
    token.status = TokenStatus.ACTIVE;
    if (user instanceof Admin) {
      token.admin = user;
    } else if (user instanceof User) {
      token.user = user;
    }
    token.expiresAt = expiresAt;
    return this.tokenRepository.save(token);
  }
}
export default new TokenService();
