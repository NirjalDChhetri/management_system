import jwt from 'jsonwebtoken'

class JwtService {
    static sign(payload: {id: string}, secret: string, expiresIn: string): string {
        return jwt.sign(payload, secret, {
            expiresIn
        })
    }
    static verify (token: string, secret: string): any {
        return jwt.verify(token, secret)
    }
}