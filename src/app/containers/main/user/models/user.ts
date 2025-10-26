import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Model from '@ship/parents/models/model';

@Entity({name: 'users'})
export default class User extends Model {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar' })
    first_name: string | undefined;

    @Column({ type: 'varchar' })
    last_name: string | undefined;

    @Column({
        type: 'varchar',
        unique: true,
    })
    email: string | undefined;

    @Column({
        type: 'timestamp'
    })
    email_verified_at: Date | null | undefined;

    @Column({ type: 'varchar' })
    password: string | undefined;

    @CreateDateColumn()
    created_at: Date | undefined;

    @UpdateDateColumn()
    updated_at: Date | undefined;
}