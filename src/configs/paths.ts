const path = require('path');

export const PROJECT_ROOT = process.cwd();
export const SRC_ROOT = path.join(PROJECT_ROOT, 'src');
export const CONTAINERS_PATH = path.join(SRC_ROOT, 'app/containers');
export const SHIP_PATH = path.join(SRC_ROOT, 'app/containers');
export const ROUTES_PATH = path.join(CONTAINERS_PATH, '*/*/ui/api/routes/*.ts');
export const MODELS_PATH = path.join(CONTAINERS_PATH, '*/*/models/*.ts');
export const MIGRATIONS_PATH = path.join(CONTAINERS_PATH, '*/*/data/migrations/*.ts');
