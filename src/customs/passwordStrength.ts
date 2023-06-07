import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PASSWORD_REGEX } from "../constant/regex";
import messages from "../constant/messages";

@ValidatorConstraint({ name: "isStrongPassword", async: true })
export class IsStrongPassword implements ValidatorConstraintInterface {
  async validate(text: string, args: ValidationArguments) {
    return await PASSWORD_REGEX.test(text);
  }
  defaultMessage(args: ValidationArguments) {
    return messages.passwordStrength;
  }
}
