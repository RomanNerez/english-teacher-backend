import glob from 'glob';
import { DataSource } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '@configs/database';
import { MIGRATIONS_PATH, MODELS_PATH } from '@configs/paths';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [
        ...glob.sync(MODELS_PATH),
    ],
    migrations: [
        ...glob.sync(MIGRATIONS_PATH),
    ]
});
