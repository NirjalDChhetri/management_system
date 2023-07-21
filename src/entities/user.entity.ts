import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";
import { Role } from "../constant/enum";

@Entity({
  name: "user",
})
export class User extends CommonField {
  @Column({
    name: "email",
    unique: true,
  })
  email: string;

  @Column({
    name: "username",
    select: true,
  })
  firstname: string;

  @Column({
    name: "password",
    select: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
