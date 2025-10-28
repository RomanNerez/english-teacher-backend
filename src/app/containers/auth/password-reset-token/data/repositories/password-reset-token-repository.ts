import PasswordResetToken from '@containers/auth/password-reset-token/models/password-reset-token';
import Repository from "@ship/parents/repositories/repository";
import { AppDataSource } from '@ship/core/foundation/database';

export default class PasswordResetTokenRepository extends Repository<PasswordResetToken> {

    constructor() {
        super(PasswordResetToken, AppDataSource.createEntityManager());
    }
}