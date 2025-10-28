import { FindOptionsWhere } from 'typeorm';
import PasswordResetToken from '@containers/auth/password-reset-token/models/password-reset-token';
import PasswordResetTokenRepository from '@containers/auth/password-reset-token/data/repositories/password-reset-token-repository';
import ParentTask from '@ship/parents/tasks/task';

export default class FindTokenWhereTask extends ParentTask {

    constructor(private repository = new PasswordResetTokenRepository) {
        super();
    }

    async run(where: FindOptionsWhere<PasswordResetToken>): Promise<PasswordResetToken | null> {
        return await this.repository.findOneBy(where);
    }
}