import crypto from 'crypto';
import CreateTokenTask from '@containers/auth/password-reset-token/tasks/create-token-task';
import DeleteTokenByEmailTask from '@containers/auth/password-reset-token/tasks/delete-token-by-email-task';
import ParentAction from '@ship/parents/actions/action';
import Mail from '@ship/core/mail/mail';
import { FRONTEND_URL } from '@configs/app';

export default class ForgotPasswordAction extends ParentAction {

    constructor(
        private createTokenTask = new CreateTokenTask,
        private deleteTokenByEmailTask = new DeleteTokenByEmailTask
    ) {
        super();
    }

    async run(email: string) {
        const token = crypto.randomBytes(32).toString('hex');
        const link = `${FRONTEND_URL}/password/reset/${token}?email=${email}`;

        await this.deleteTokenByEmailTask.run(email);
        await this.createTokenTask.run(email, token);

        (new Mail())
            .to(email)
            .subject('Password Reset')
            .text(`Click the following link to reset your password: ${link}`)
            .send();
    }
}