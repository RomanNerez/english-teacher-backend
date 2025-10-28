import Model from '@ship/parents/models/model';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password_reset_tokens')
export default class PasswordResetToken extends Model {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    email?: string;

    @Column()
    token?: string;

    @CreateDateColumn()
    created_at?: string
}