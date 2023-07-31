import { AppDataSource } from "../config/database.config";
import messages from "../constant/messages";
import { ChangePasswordDTO, LoginDTO } from "../dtos/login.dto";
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

  async changePassword(data: ChangePasswordDTO, user: User) {
    const { newPassword, oldPassword } = data;
    const findUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      select: ["email", "password", "role", "id"],
    });
    if (!findUser) {
      throw HttpException.notFound(messages["dataNotFound"]);
    }
    const isCorrectPassword = await BcryptService.compare(
      oldPassword,
      findUser.password
    );
    if (!isCorrectPassword) {
      throw HttpException.badRequest(messages["invalidRequest"]);
    }
    findUser.password = await BcryptService.hash(newPassword);
    await this.userRepository.save(findUser);
    return findUser;
  }
}

export default new AuthService();
