import jwt from 'jsonwebtoken';
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN
} from '@configs/jwt';
import ms from 'ms';

export default class JWT {

    static generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
        });

        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
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