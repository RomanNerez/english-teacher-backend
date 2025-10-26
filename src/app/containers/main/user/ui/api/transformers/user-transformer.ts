import User from '@containers/main/user/models/user';
import ParentTransformer from '@ship/parents/transformers/transformer';

export default class UserTransformer extends ParentTransformer<User> {

    transform(user: User): Record<string, any> {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            email_verified_at: user.email_verified_at,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    }
}