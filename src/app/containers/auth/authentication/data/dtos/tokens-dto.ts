export default class TokensDTO {

    constructor(
        public accessToken: string,
        public refreshToken: string,
        public rememberMe: boolean,
    ) {
    }
}