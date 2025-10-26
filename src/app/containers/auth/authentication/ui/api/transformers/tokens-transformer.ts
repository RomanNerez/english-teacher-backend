import TokensDTO from "@containers/auth/authentication/data/dtos/tokens-dto";
import Transformer from "@ship/parents/transformers/transformer";

export default class TokensTransformer extends Transformer<TokensDTO> {

    transform(tokens: TokensDTO): Record<string, any> {
        return {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
        };
    }
}