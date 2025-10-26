import User from '@containers/main/user/models/user';
import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';
import InvalidCredentialsError from '@containers/auth/authentication/errors/invalid-credentials-error';
import FindUserByEmailTask from '@containers/main/user/tasks/find-user-by-email-task';
import ParentAction from '@ship/parents/actions/action';
import Hash from '@ship/core/supports/hash';

export default class CheckUserCredentialsSubAction extends ParentAction{

    constructor(private findUserTask = new FindUserByEmailTask()) {
        super();
    }

    async run(dto: LoginDTO): Promise<User> {
        const user = await this.findUserTask.run(dto.email);
        
        const isMatched = Hash.check(dto.password, user?.password || '');

        if (!user || isMatched === false) throw new InvalidCredentialsError('Invalid credentials', 401);

        return user;
    }
}