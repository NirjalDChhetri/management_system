import { AppDataSource } from "../config/database.config";
import { TokenStatus } from "../constant/enum";
import { Admin } from "../entities/admin.entity";
import Token from "../entities/token.entity";

class TokenService {
  constructor(private tokenRepository = AppDataSource.getRepository(Token)) {}

  async create(userToken: string, expiresAt: Date, user: Admin) {
    const token = new Token();
    token.token = userToken;
    token.status = TokenStatus.ACTIVE;
    if (user instanceof Admin) {
      token.admin = user;
    }
    token.expiresAt = expiresAt;
    return this.tokenRepository.save(token);
  }
}
export default new TokenService();
