import ParentTask from '@ship/parents/tasks/task';
import UserRepository from '@containers/main/user/data/repositories/user-repository';
import User from '@containers/main/user/models/user';
import CreateResourceFailedError from '@ship/errors/create-resource-failed-error';
import CreateUserDTO from '@containers/main/user/data/dtos/create-user-dto';

export default class CreateUserTask extends ParentTask {

    constructor(private repository = new UserRepository()) {
        super()
    }

    async run(dto: CreateUserDTO): Promise<User> {
        try {
            const user = this.repository.create(dto);

            const savedUser = await this.repository.save(user);

            return savedUser;
        } catch (error) {
            console.error(error);
            throw new CreateResourceFailedError()
        }
    }
}