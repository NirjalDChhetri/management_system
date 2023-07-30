import { AppDataSource } from "../config/database.config";
import messages from "../constant/messages";
import { LoginDTO } from "../dtos/login.dto";
import { Admin } from "../entities/admin.entity";
import { User } from "../entities/user.entity";
import HttpException from "../utils/HttpException";
import BcryptService from "../utils/bcrypt.utils";
import JwtService from "../utils/jwt.utils";

class AuthService {
  constructor(
    private adminRepository = AppDataSource.getRepository(Admin),
    private userRepository = AppDataSource.getRepository(User)
  ) {}
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

  async userLogin(data: LoginDTO) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
      select: ["email", "password", "role", "id"],
    });
    if (findUser) {
      let verifyPassword = await BcryptService.compare(
        data.password,
        findUser?.password
      );
      if (!verifyPassword) {
        throw HttpException.badRequest(messages["invalidAuth"]);
      }
      return findUser;
    }
    throw HttpException.badRequest(messages["invalidAuth"]);
  }
}

export default new AuthService();
