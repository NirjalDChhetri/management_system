import { Column, Entity, OneToMany } from "typeorm";
import { CommonField } from "./commonEntity";
import { Role } from "../constant/enum";
import Token from "./token.entity";

@Entity({
  name: "admin",
})
export class Admin extends CommonField {
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    name: "role",
    type: "enum",
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Token, (token) => token.admin, {
    nullable: true,
    onDelete: "CASCADE",
  })
  tokens: Token[];
}
