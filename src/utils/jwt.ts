import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import {
    ACCESS_JWT_SECRET_KEY,
    ACCESS_JWT_TOKEN_EXPIRY,
    REFRESH_JWT_TOKEN_SECRET_KEY,
    REFRESH_JWT_TOKEN_EXPIRY,
} from './constants';

export class JwtService {

    static generateAccessToken(
        payload: Record<string, any>,
        expiresIn: string = ACCESS_JWT_TOKEN_EXPIRY
    ): string {
        return jwt.sign(payload, ACCESS_JWT_SECRET_KEY as string, { expiresIn } as SignOptions);
    }

    static validateAccessToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, ACCESS_JWT_SECRET_KEY as string) as JwtPayload;
        } catch (error) {
            throw error;
        }
    }

    static generateRefreshToken(
        payload: Record<string, any>,
        expiresIn: string = REFRESH_JWT_TOKEN_EXPIRY
    ): string {
        return jwt.sign(payload, REFRESH_JWT_TOKEN_SECRET_KEY as string, { expiresIn } as SignOptions);
    }

    static validateRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, REFRESH_JWT_TOKEN_SECRET_KEY as string) as JwtPayload;
        } catch (error) {
            throw error;
        }
    }
}
