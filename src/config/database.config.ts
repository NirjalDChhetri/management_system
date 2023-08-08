import "reflect-metadata";
import { DataSource } from "typeorm";
import ENV from "./env.config";
import { Admin } from "../entities/admin.entity";
import Token from "../entities/token.entity";
import { User } from "../entities/user.entity";
import { ResetPassword } from "../entities/resetPassword.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: ENV.DB_HOST,
  port: +ENV.DB_PORT! || 3306,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [ Admin, Token, User, ResetPassword ],
  logging: false,
  synchronize: true,
  //dropSchema: true,
});
