import PasswordResetDTO from '@containers/auth/authentication/data/dtos/password-reset-dto';
import DeleteTokenByEmailTask from '@containers/auth/password-reset-token/tasks/delete-token-by-email-task';
import FindTokenWhereTask from '@containers/auth/password-reset-token/tasks/find-token-where-task';
import FindUserByEmailTask from '@containers/main/user/tasks/find-user-by-email-task';
import UpdateUserTask from '@containers/main/user/tasks/update-user-task';
import HttpError from '@ship/core/errors/http-error';
import Hash from '@ship/core/supports/hash';
import ParentAction from '@ship/parents/actions/action';

export default class PasswordResetAction extends ParentAction {

    constructor(
        private findTokenWhereTask = new FindTokenWhereTask,
        private deleteTokenByEmailTask = new DeleteTokenByEmailTask,
        private findUserByEmailTask = new FindUserByEmailTask,
        private updateUserTask = new UpdateUserTask,
    ) {
        super();
    }

    async run({email, password, token}: PasswordResetDTO): Promise<void> {
        const tokenEntity = await this.findTokenWhereTask.run({email, token});

        if (!tokenEntity) {
            throw new HttpError('Token is invalid!');
        }

        const user = await this.findUserByEmailTask.run(email);
        await this.updateUserTask.run(user?.id!, {password: Hash.make(password)});
        await this.deleteTokenByEmailTask.run(email);
    }
}