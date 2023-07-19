import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Validate,
  ValidateNested,
} from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";
import { IsStrongPassword } from "../customs/passwordStrength";

export class UserDTO {
  @IsNotEmptyObject()
  @ValidateNested()
  firstName: string;

  @IsOptional()
  middleName?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsEmailExist)
  email: string;

  @IsNotEmpty()
  @Validate(IsStrongPassword)
  password: string;
}
