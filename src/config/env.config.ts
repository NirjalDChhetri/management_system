import dotenv from "dotenv";
import path from "path";
import "dotenv/config";

console.log("env path : ", path.join(__dirname, "../../.env"));

dotenv.config({ path: path.join(__dirname, "../../.env") });

class DotenvConfig {
  static PORT = +process.env.PORT!;
  //Database
  static DB_NAME = process.env.DB_NAME;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT!;
  static DB_USER = process.env.DB_USER;
  static DB_PASSWORD = process.env.DB_PASSWORD;

  //JWT configuration
  static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  static ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;
  static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  static REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN!;
}
export default DotenvConfig;
