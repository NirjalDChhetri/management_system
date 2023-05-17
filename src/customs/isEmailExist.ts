import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { AppDataSource } from "../config/database.config";
import { User } from "../entities/user.entity";
import messages from "../constant/messages";

@ValidatorConstraint({ name: "isEmailExist", async: true })
export class IsEmailExist implements ValidatorConstraintInterface {
  async validate(email: string, _arg: ValidationArguments) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return true;
    }
    return false;
  }
  defaultMessage(_arg: ValidationArguments) {
    return messages.invalidAuth;
  }
}
