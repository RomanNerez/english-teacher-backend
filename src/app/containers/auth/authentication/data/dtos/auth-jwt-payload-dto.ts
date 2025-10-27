import { JwtPayload } from 'jsonwebtoken';

export default class AuthJwtPayloadDTO {

    constructor(
        public userId: number,
        public rememberMe: boolean,
    ) {
    }

    static createFromJwtPayload(payload: string | JwtPayload): AuthJwtPayloadDTO {
        if (typeof payload === 'string') throw new Error('Invalid payload');

        const { userId, rememberMe } = payload;

        return new AuthJwtPayloadDTO(userId, rememberMe);
    }

    toObj() {
        return {
            userId: this.userId,
            rememberMe: this.rememberMe,
        }
    }
}