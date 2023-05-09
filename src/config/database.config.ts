import "reflect-metadata";
import { DataSource } from "typeorm";
import ENV from "./env.config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: ENV.DB_HOST,
  port: +ENV.DB_PORT! || 3306,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [],
  logging: false,
  //dropSchema: true,
});
