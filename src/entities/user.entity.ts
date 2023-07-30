import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { CommonField } from "./commonEntity";
import { Role } from "../constant/enum";
import BcryptService from "../utils/bcrypt.utils";
import Token from "./token.entity";

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
  username: string;

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

  @OneToMany(() => Token, (token) => token.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  tokens: Token[];

  @BeforeInsert()
  async hashedPassword() {
    this.password = await BcryptService.hash(this.password);
  }
}
