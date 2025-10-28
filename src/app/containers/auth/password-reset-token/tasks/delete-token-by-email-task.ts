import { DeleteResult } from 'typeorm';
import PasswordResetTokenRepository from '@containers/auth/password-reset-token/data/repositories/password-reset-token-repository';
import ParentTask from '@ship/parents/tasks/task';
import CreateResourceFailedError from '@ship/errors/create-resource-failed-error';

export default class DeleteTokenByEmailTask extends ParentTask {

    constructor(private repository = new PasswordResetTokenRepository) {
        super();
    }

    async run(email: string): Promise<DeleteResult> {
        try {
            return await this.repository.delete({ email });
        } catch (error) {
            console.error(error);
            throw new CreateResourceFailedError()
        }
    }
}