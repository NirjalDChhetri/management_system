import { IsEnum, IsNotEmpty, IsOptional, Validate } from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";
import { IsStrongPassword } from "../customs/passwordStrength";
import { Role } from "../constant/enum";
export class AdminDTO {
  @IsNotEmpty()
  @IsNotEmpty()
  @Validate(IsEmailExist)
  email: string;

  @IsNotEmpty()
  @Validate(IsStrongPassword)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
