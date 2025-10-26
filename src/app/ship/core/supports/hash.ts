import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from '@configs/hashing';

export default class Hash {
    
    static make(password: string): string {
        const rounds = Number(BCRYPT_ROUNDS);
        const salt = bcrypt.genSaltSync(rounds);

        return bcrypt.hashSync(password, salt);
    }

    static check(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}