import jwt from 'jsonwebtoken';
import ms from 'ms';
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN_LONG_TERM,
    REFRESH_TOKEN_EXPIRES_IN_SHORT_TERM
} from '@configs/jwt';

export default class JWT {

    static generateTokens(payload: Record<string, any>, remember: boolean = false) {
        const refreshExpiredIn = remember ?
            REFRESH_TOKEN_EXPIRES_IN_LONG_TERM : 
            REFRESH_TOKEN_EXPIRES_IN_SHORT_TERM;

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
        });

        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: refreshExpiredIn as ms.StringValue,
        });

        return { accessToken, refreshToken };
    }

    static verifyAccessToken(token: string) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
}