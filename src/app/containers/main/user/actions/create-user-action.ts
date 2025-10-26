import ParentAction from '@ship/parents/actions/action';
import CreateUserTask from '@containers/main/user/tasks/create-user-task';
import CreateUserDTO from '@containers/main/user/data/dtos/create-user-dto';
import User from '@containers/main/user/models/user';
import Hash from '@ship/core/supports/hash';

export default class CreateUserAction extends ParentAction {

    constructor(private task = new CreateUserTask()) {
        super();
    }

    async run(dto: CreateUserDTO): Promise<User> {
        dto.password = Hash.make(dto.password);

        return await this.task.run(dto);
    }
}