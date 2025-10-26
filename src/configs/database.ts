// DB
export const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql' ;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 3306);
export const DB_DATABASE = process.env.DB_DATABASE || 'default';

// User
export const DB_USERNAME = process.env.DB_USERNAME || 'user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
