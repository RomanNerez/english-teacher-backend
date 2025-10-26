import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1761425608586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const id = { name: 'id', type: 'int', isPrimary: true, isGenerated: true, };
        const first_name = { name: 'first_name', type: 'varchar', length: '255', };
        const last_name = { name: 'last_name', type: 'varchar', length: '255', };
        const email = { name: 'email', type: 'varchar', isUnique: true, length: '255', };
        const email_verified_at = { name: 'email_verified_at', type: 'timestamp', isNullable: true, };
        const password = { name: 'password', type: 'varchar', length: '255', };
        const created_at = { name: 'created_at', type: 'timestamp', default: 'now()', };
        const updated_at = { name: 'updated_at', type: 'timestamp', default: 'now()', };

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    id,
                    first_name,
                    last_name,
                    email,
                    email_verified_at,
                    password,
                    created_at,
                    updated_at,
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
