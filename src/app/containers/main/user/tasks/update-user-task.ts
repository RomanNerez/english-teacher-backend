import { UpdateResult } from 'typeorm';
import ParentTask from '@ship/parents/tasks/task';
import UserRepository from '@containers/main/user/data/repositories/user-repository';
import User from '@containers/main/user/models/user';
import UpdateResourceFailedError from '@ship/errors/update-resource-failed-error';

export default class UpdateUserTask extends ParentTask {

    constructor(private repository = new UserRepository()) {
        super()
    }

    async run(id: number, data: Partial<User>): Promise<UpdateResult> {
        try {
            return await this.repository.update(id, data);
        } catch (error) {
            console.error(error);
            throw new UpdateResourceFailedError()
        }
    }
}