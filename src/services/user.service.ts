import { error } from "console";
import { AppDataSource } from "../config/database.config";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
import HttpException from "../utils/HttpException";

class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}

  async signup(data: UserDTO) {
    let user = new User();
    user.email = data.email;
    user.username = data.userName;
    user.password = data.password;
    const newUser = await this.userRepository.save(user);
    if (!newUser) {
      throw new error("User not Saved");
    }
    return newUser;
  }
}

export default new UserService();
