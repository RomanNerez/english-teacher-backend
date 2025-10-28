import PasswordResetToken from '@containers/auth/password-reset-token/models/password-reset-token';
import PasswordResetTokenRepository from '@containers/auth/password-reset-token/data/repositories/password-reset-token-repository';
import ParentTask from '@ship/parents/tasks/task';
import CreateResourceFailedError from '@ship/errors/create-resource-failed-error';

export default class CreateTokenTask extends ParentTask {

    constructor(private repository = new PasswordResetTokenRepository) {
        super();
    }

    async run(email: string, token: string): Promise<PasswordResetToken> {
        try {
            const passwordResetToken = this.repository.create({ email, token });

            const savedPasswordResetToken = await this.repository.save(passwordResetToken);

            return savedPasswordResetToken;
        } catch (error) {
            console.error(error);
            throw new CreateResourceFailedError()
        }
    }
}