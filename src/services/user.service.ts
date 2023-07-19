import { AppDataSource } from "../config/database.config";
import { UserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}

  async signup(data: UserDTO) {}
}

export default new UserService();