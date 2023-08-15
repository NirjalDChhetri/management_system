import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
  validate,
} from "class-validator";
import { IsStrongPassword } from "../customs/passwordStrength";

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsStrongPassword)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}

export class ForgotPasswordDTO {
  @IsString()
  @IsEmail()
  email: string;
}

export class ResetPasswordDTO {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @Validate(IsStrongPassword)
  newPassword: string;
}
