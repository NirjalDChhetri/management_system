import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";
import { IsStrongPassword } from "../customs/passwordStrength";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  userName: string;

  // @IsOptional()
  // middleName?: string;

  // @IsString()
  // @IsNotEmpty()
  // lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsEmailExist)
  email: string;

  @IsNotEmpty()
  @Validate(IsStrongPassword)
  password: string;
}
