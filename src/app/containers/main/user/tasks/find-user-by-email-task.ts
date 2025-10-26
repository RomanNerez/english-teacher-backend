import UserRepository from '@containers/main/user/data/repositories/user-repository';
import ParentTask from '@ship/parents/tasks/task';
import User from '@containers/main/user/models/user';

export default class FindUserByEmailTask extends ParentTask {
 
    constructor(private repository = new UserRepository()) {
        super()
    }

    async run(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }
}