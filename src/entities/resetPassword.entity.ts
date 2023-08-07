import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";
import { Role } from "../constant/enum";

@Entity("reset_password_token")
export class ResetPassword extends CommonField {
  @Column({
    name: "token",
  })
  token: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: "bool",
    default: true,
  })
  status: Boolean;

  @Column({
    type: "bigint",
    default: Date.now() + 1000 * 60 * 10, //10 Min
  })
  expiresIn: number;
}
