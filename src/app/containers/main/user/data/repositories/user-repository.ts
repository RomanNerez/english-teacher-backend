import User from '@containers/main/user/models/user';
import { AppDataSource } from '@ship/core/foundation/database';
import Repository from '@ship/parents/repositories/repository';

export default class UserRepository extends Repository<User> {

    constructor() {
        super(User, AppDataSource.createEntityManager());
    }
}