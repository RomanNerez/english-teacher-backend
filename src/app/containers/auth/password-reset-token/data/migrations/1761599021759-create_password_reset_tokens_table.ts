import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePasswordResetTokensTable1761599021759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const id = { name: 'id', type: 'int', isPrimary: true, isGenerated: true, };
        const email = { name: 'email', type: 'varchar', length: '255', };
        const token = { name: 'token', type: 'varchar', length: '255', };
        const created_at = { name: 'created_at', type: 'timestamp', default: 'now()', };

        await queryRunner.createTable(
            new Table({
                name: 'password_reset_tokens',
                columns: [
                    id,
                    email,
                    token,
                    created_at,
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_reset_tokens');
    }
}
