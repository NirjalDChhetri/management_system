import { AppDataSource } from "../config/database.config";
import Token from "../entities/token.entity";


class TokenService {
    constructor( private tokenRepository = AppDataSource.getRepository(Token)) {}
}