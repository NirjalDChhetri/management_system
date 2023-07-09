import { AppDataSource } from "../config/database.config";
import messages from "../constant/messages";
import { LoginDTO } from "../dtos/login.dto";
import { Admin } from "../entities/admin.entity";
import HttpException from "../utils/HttpException";
import BcryptService from "../utils/bcrypt.utils";

class AuthService {
  constructor(private adminRepository = AppDataSource.getRepository(Admin)) {}
  async adminLogin(data: LoginDTO) {
    const findAdmin = await this.adminRepository.findOne({
      where: { email: data.email },
      select: ["email", "password", "role", "id"],
    });
    if (findAdmin) {
      const verifyPassword = await BcryptService.compare(
        data.password,
        findAdmin?.password
      );
      if (!verifyPassword) {
        throw HttpException.badRequest(messages["invalidAuth"]);
      }
      return findAdmin;
    }
  }
}

export default new AuthService();
