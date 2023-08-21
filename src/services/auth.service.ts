import { randomBytes } from "crypto";
import { AppDataSource } from "../config/database.config";
import messages from "../constant/messages";
import {
  ChangePasswordDTO,
  ForgotPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
} from "../dtos/login.dto";
import { Admin } from "../entities/admin.entity";
import { User } from "../entities/user.entity";
import HttpException from "../utils/HttpException";
import BcryptService from "../utils/bcrypt.utils";
import JwtService from "../utils/jwt.utils";
import { ResetPassword } from "../entities/resetPassword.entity";
import emailService from "./email.service";
import DotenvConfig from "../config/env.config";
import { MoreThan } from "typeorm";

class AuthService {
  constructor(
    private adminRepository = AppDataSource.getRepository(Admin),
    private userRepository = AppDataSource.getRepository(User),
    private resetPasswordRepository = AppDataSource.getRepository(ResetPassword)
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

  async forgotPassword(data: ForgotPasswordDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw HttpException.badRequest("email doesnot exist");
    }
    let code = randomBytes(6).toString("hex");
    let resetToken = new ResetPassword();
    resetToken.user = user;
    resetToken.token = code;
    emailService.sendResetMail(
      `${DotenvConfig.BASE_URL}/aip/v1/auth/reset-password?token=${code}`,
      user.email
    );
    return await this.resetPasswordRepository.save(resetToken);
  }

  async setNewPassword(data: ResetPasswordDTO) {
    let resetToken = await this.resetPasswordRepository.findOne({
      where: {
        token: data.code,
        expiresIn: MoreThan(Date.now()),
        status: true,
      },
      relations: {
        user: true,
      },
    });
    if (!resetToken) {
      throw HttpException.badRequest("Not found");
    }
    if (resetToken.user) {
      resetToken.user.password = data.newPassword;
      await resetToken.user.save();
    }
    resetToken.status = false;
    await resetToken.save();
  }
}

export default new AuthService();
